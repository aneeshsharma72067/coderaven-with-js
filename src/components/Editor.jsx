import React, { useEffect, useRef } from "react";

import CodeMirror from "codemirror";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/clike/clike";
import "codemirror/addon/edit/matchbrackets";
import { ACTIONS } from "../../actions";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  const codeRef = useRef(null);
  useEffect(() => {
    async function init() {
      if (editorRef.current) {
        codeRef.current = CodeMirror.fromTextArea(editorRef.current, {
          mode: "text/x-c++src",
          theme: "dracula",
          lineNumbers: true,
          autofocus: true,
          autoCloseTags: true,
          autoCloseBrackets: true,
          matchBrackets: true,
        });
      }

      codeRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          codeRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);
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
