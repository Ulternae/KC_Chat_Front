import { useCallback } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownToolbar } from "./MarkdownToolbar";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { MarkdownTheme } from "./MarkdownTheme";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { useTranslation } from "react-i18next";

const Placeholder = ({ text }) => {
  return (
    <div className="text-liwr-900/60 z-10 dark:text-perl-100/40 absolute top-20 left-4 right-4 text-sm ">
      <p>{text}</p>
    </div>
  );
};

const MarkdownPersonalized = ({ info, setInfo, className, toolbarClass = '', chatClass = '' }) => {
  const { t } = useTranslation();
  const onChange = useCallback((editorState) => {
    editorState.read(() => {
      const content = JSON.stringify(editorState.toJSON());
      setInfo(content);
    });
  }, []);

  const editorConfig = {
    theme: MarkdownTheme,
    onError(error) {
      throw error;
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
    // Function to set initial editor state
    editorState: (editor) => {
      editor.update(() => {
        const editorState = editor.parseEditorState(info);
        editor.setEditorState(editorState);
      });
    },
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
        <div className={className}>
          <MarkdownToolbar className={toolbarClass} />

          <RichTextPlugin
            contentEditable={<ContentEditable className={chatClass} />}
            placeholder={<Placeholder text={t("messages.writeMessage")} />}
            ErrorBoundary={LexicalErrorBoundary}
          />

          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <ClearEditorPlugin />
        </div>
    </LexicalComposer>
  );
};

export { MarkdownPersonalized };
