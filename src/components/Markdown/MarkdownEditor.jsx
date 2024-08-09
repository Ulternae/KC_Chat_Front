import { useCallback, useState } from "react";
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
import { IconSendMessage } from "@assets/IconSendMessage";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { useTranslation } from "react-i18next";

const Placeholder = ({ text }) => {
  return (
    <div 
      className="text-liwr-900/60 z-10 dark:text-perl-100/40 absolute top-4 left-4 right-4 text-sm "
    >
      <p>{text}</p>
    </div>
  );
}

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
};

const MarkdownEditor = ({ chat, sendMessageChat , className}) => {
  const { t } = useTranslation()

  const [message, setMessage] = useState("");
  const onChange = useCallback((editorState) => {
    editorState.read(() => {
      const content = JSON.stringify(editorState.toJSON());
      setMessage(content);
    });
  }, []);

  const handleSend = () => {
    const buttonDelete = document.querySelector('.ButtonMarkdownDelete')
    buttonDelete.click()
    sendMessageChat({
      room: chat.chat_id,
      content: message,
      type: "markdown",
    })
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={`relative mt-auto ${className} px-2 mx-2 sm:mx-4 bg-liwr-300 dark:bg-perl-300 rounded-lg flex flex-col`}>
        <MarkdownToolbar 
        className="w-[calc(100%+16px)] h-8 bg-liwr-500/50 dark:bg-perl-400/50 rounded-t-lg flex justify-start px-2 sm:justify-end items-center sm:px-4 -mx-2 "
        />
        <div className=" relative overflow-x-auto mt-auto w-full min-h-28 max-h-32 rounded-b-lg flex flex-col gap-2 justify-center px-1 py-4 sm:px-4">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="resize-none bg-transparent z-20 focus:outline-none h-20 text-sm font-normal text-liwr-900 dark:text-perl-100" />
            }
            placeholder={<Placeholder text={t('messages.writeMessage')} />}
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
        <IconSendMessage
          className="absolute z-20 right-4 bottom-4 cursor-pointer"
          onClick={handleSend}
        />
      </div>
    </LexicalComposer>
  );
};

export { MarkdownEditor };
