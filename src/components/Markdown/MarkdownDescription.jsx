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
import { ThemeMarkdown } from "./Theme";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { useTranslation } from "react-i18next";

const Placeholder = ({ text }) => {
  return (
    <div
      className="text-liwr-900/50 dark:text-perl-100/40 z-10 absolute top-4 left-4 right-4 text-sm "
    >
      <p>{text}</p>
    </div>
  );
}

const editorConfig = {
  theme: ThemeMarkdown,
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
};

const MarkdownDescription = ({ setFieldsContent }) => {
  const { t } = useTranslation()

  const onChange = useCallback((editorState) => {
    editorState.read(() => {
      const content = JSON.stringify(editorState.toJSON());
      setFieldsContent((prevFieldsContent) => ({
        ...prevFieldsContent,
        description: content
      }));
    });
  }, [setFieldsContent]);


  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={'relative mt-auto  bg-liwr-300 dark:bg-perl-600 rounded-lg flex flex-col'}>

        <div className="px-4 relative overflow-x-auto mt-auto w-full min-h-28 max-h-32 rounded-b-lg flex flex-col gap-2 justify-center py-4 sm:px-4">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="resize-none bg-transparent z-10 focus:outline-none h-20 text-sm font-normal text-liwr-900 dark:text-perl-100" />
            }
            placeholder={<Placeholder text={t('groups.writeDescription')} />}
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
        <MarkdownToolbar
          className={'flex bg-liwr-500/50 dark:bg-perl-500 w-full max-w-[220px] sm:max-w-[240px] px-2 rounded-bl-lg rounded-tr-lg'}
        />
      </div>
    </LexicalComposer>
  );
};

export { MarkdownDescription };
