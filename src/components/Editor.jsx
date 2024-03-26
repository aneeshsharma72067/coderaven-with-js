import React, { useEffect, useRef } from "react";

import CodeMirror from "codemirror";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/edit/matchbrackets";

const Editor = () => {
  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      if (editorRef.current) {
        console.log("codemiror working");
        CodeMirror.fromTextArea(editorRef.current, {
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
