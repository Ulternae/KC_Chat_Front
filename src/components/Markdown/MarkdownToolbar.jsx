import {
  $getSelection,
  $isRangeSelection,
  CLEAR_EDITOR_COMMAND,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  REMOVE_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $createQuoteNode } from "@lexical/rich-text";
import { $wrapNodes } from "@lexical/selection";
import { ButtonMarkdown } from "../Button/ButtonMarkdown";
import { IconCode } from "../../assets/Markdown/IconCode";
import { IconBold } from "../../assets/Markdown/IconBold";
import { IconItalic } from "../../assets/Markdown/IconItalic";
import { IconStrikeThrough } from "../../assets/Markdown/IconStrikeThrough";
import { IconBulletList } from "../../assets/Markdown/IconBulletList";
import { IconNumberedList } from "../../assets/Markdown/IconNumberedList";
import { IconQuote } from "../../assets/Markdown/IconQuote";
import { IconDelete } from "../../assets/Markdown/IconDelete";

const LowPriority = 1;

const MarkdownToolbar = () => {
  const toolbarRef = useRef(null);
  const stylesActive = "bg-liwr-300 dark:bg-perl-300";
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberedList, setIsNumberedList] = useState(false);
  const [isQuote, setIsQuote] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsCode(selection.hasFormat("code"));
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementType = element.getType();

      setIsBulletList(elementType === "unordered-list");
      setIsNumberedList(elementType === "ordered-list");
      setIsQuote(elementType === "quote");
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => new $createQuoteNode());
      }
    });
  };

  return (
    <div
      className="w-[calc(100%+16px)] h-8 bg-liwr-500/50 dark:bg-perl-400/50 rounded-t-lg flex justify-start px-2 sm:justify-end items-center sm:px-4 -mx-2 "
      ref={toolbarRef}
    >
      <ButtonMarkdown
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        icon={IconCode}
        className={isCode ? stylesActive : ""}
      />
      <ButtonMarkdown
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        icon={IconBold}
        isDisabled={isCode}
        className={isBold ? stylesActive : ""}
      />
      <ButtonMarkdown
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        icon={IconItalic}
        isDisabled={isCode}
        className={isItalic ? stylesActive : ""}
      />
      <ButtonMarkdown
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        icon={IconStrikeThrough}
        isDisabled={isCode}
        className={isStrikethrough ? stylesActive : ""}
      />
      <ButtonMarkdown
        onClick={() =>
          editor.dispatchCommand(
            isBulletList ? REMOVE_LIST_COMMAND : INSERT_UNORDERED_LIST_COMMAND,
            undefined
          )
        }
        icon={IconBulletList}
        className={isBulletList ? stylesActive : ""}
      />
      <ButtonMarkdown
        onClick={() =>
          editor.dispatchCommand(
            isNumberedList ? REMOVE_LIST_COMMAND : INSERT_ORDERED_LIST_COMMAND,
            undefined
          )
        }
        icon={IconNumberedList}
        className={isNumberedList ? stylesActive : ""}
      />
      <ButtonMarkdown
        onClick={formatQuote}
        icon={IconQuote}
        className={isQuote ? stylesActive : ""}
      />
      <ButtonMarkdown
        onClick={() => editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)}
        icon={IconDelete}
        className={'ButtonMarkdownDelete'}
      />
    </div>
  );
};

export { MarkdownToolbar };
