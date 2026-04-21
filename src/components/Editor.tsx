import type { MeiContext } from "../types";
import { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { xml } from "@codemirror/lang-xml";

interface EditorProps {
  code: string;
  onChange: (value: string) => void;
  availableContexts: MeiContext[];
  selectedContext: MeiContext | null;
  onContextChange: (ctx: MeiContext) => void;
  theme: "light" | "dark";
}

function Editor({
  code,
  onChange,
  availableContexts,
  selectedContext,
  onContextChange,
  theme,
}: EditorProps) {
  const editorOnChange = useCallback(
    (val: string, _: any) => {
      onChange(val);
    },
    [onChange],
  );

  return (
    <article
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>MEI Source</span>

        {/* Context Selector Dropdown */}
        <select
          style={{
            width: "auto",
            margin: 0,
            padding: "0.2rem 2rem 0.2rem 1rem",
            fontSize: "0.8rem",
          }}
          value={selectedContext?.id || ""}
          onChange={(e) => {
            const ctx = availableContexts.find((c) => c.id === e.target.value);
            if (ctx) onContextChange(ctx);
          }}
          disabled={availableContexts.length === 0}
        >
          {availableContexts.length === 0 && (
            <option value="">No Jianzipu layers found</option>
          )}
          {availableContexts.map((ctx) => (
            <option key={ctx.id} value={ctx.id}>
              Staff {ctx.staffN}, Layer {ctx.layerN}
            </option>
          ))}
        </select>
      </header>
      <CodeMirror
        className="overflow-auto"
        value={code}
        extensions={[xml()]}
        onChange={editorOnChange}
        spellCheck={false}
        theme={theme}
      />
    </article>
  );
}

export default Editor;
