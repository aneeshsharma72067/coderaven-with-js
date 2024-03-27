import React, { useEffect, useRef } from "react";

import CodeMirror from "codemirror";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/edit/matchbrackets";
import { ACTIONS } from "../../actions";

const Editor = ({ socketRef, roomId }) => {
  const editorRef = useRef(null);
  const codeRef = useRef(null);
  useEffect(() => {
    async function init() {
      if (editorRef.current) {
        console.log("codemiror working");
        codeRef.current = CodeMirror.fromTextArea(editorRef.current, {
          mode: {
            name: "javascript",
            json: true,
          },
          theme: "dracula",
          lineNumbers: true,
          autofocus: true,
          autoCloseTags: true,
          autoCloseBrackets: true,
          matchBrackets: true,
        });
      }

      codeRef.current.on("change", (instance, changes) => {
        console.log("changes", changes);
        const { origin } = changes;
        const code = instance.getValue();
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
        console.log(code);
      });

      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          codeRef.current.setValue(code);
        }
      });
    }
    init();
  }, []);
  return (
    <div className="w-full h-full">
      <textarea
        name="editor"
        id="editor"
        className="w-full h-full"
        ref={editorRef}
      ></textarea>
    </div>
  );
};

export default Editor;
