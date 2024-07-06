
const ThemeMarkdown = {
  text: {
    bold: 'font-bold',
    code: 'bg-liwr-100/50 dark:bg-liwr-200/40 px-1 px-[2px] rounded text-sm',
    italic: 'italic',
    strikethrough: 'line-through'
  },
  list: {
    ul: 'list-disc list-inside ml-3',
    ol: 'list-decimal list-outside ml-6 indent-2',
  },
  quote: 'border-l-4 border-liwr-600 dark:border-perl-600 bg-liwr-100/20 dark:bg-liwr-200/20 pl-2 my-2',
  ltr: 'text-left',
  rtl: 'text-right',
};

const stylesFormatMarkdown = {
  1: ThemeMarkdown.text.bold,
  2: ThemeMarkdown.text.italic,
  3: `${ThemeMarkdown.text.bold} ${ThemeMarkdown.text.italic}`,
  4: ThemeMarkdown.text.strikethrough,
  5: `${ThemeMarkdown.text.bold} ${ThemeMarkdown.text.strikethrough}`,
  6: `${ThemeMarkdown.text.italic} ${ThemeMarkdown.text.strikethrough}`,
  7: `${ThemeMarkdown.text.bold} ${ThemeMarkdown.text.italic} ${ThemeMarkdown.text.strikethrough}`,
  16: ThemeMarkdown.text.code,
  17: `${ThemeMarkdown.text.bold} ${ThemeMarkdown.text.code}`,
  18: `${ThemeMarkdown.text.italic} ${ThemeMarkdown.text.code}`,
  19: `${ThemeMarkdown.text.bold} ${ThemeMarkdown.text.italic} ${ThemeMarkdown.text.code}`,
  20: `${ThemeMarkdown.text.strikethrough} ${ThemeMarkdown.text.code}`,
  21: `${ThemeMarkdown.text.bold} ${ThemeMarkdown.text.strikethrough} ${ThemeMarkdown.text.code}`,
  22: `${ThemeMarkdown.text.italic} ${ThemeMarkdown.text.strikethrough} ${ThemeMarkdown.text.code}`,
  23: `${ThemeMarkdown.text.italic} ${ThemeMarkdown.text.strikethrough} ${ThemeMarkdown.text.code} ${ThemeMarkdown.text.bold}`,
};

const MarkdownView = ({ data }) => {
  if (!data) return

  const children = JSON.parse(data).root.children;

  const renderText = (node) => {
    const formatClass = stylesFormatMarkdown[node.format] || '';
    return (
      <span 
        key={crypto.randomUUID()}
        className={formatClass}>
        {node.text}
        
      </span>
    );
  };

  const renderParagraph = (node) => {
    const content = node.children.length > 0 ? (
      node.children.map((child, index) => renderText(child, index))
    ) : ('\u00A0')
    return (
      <p key={crypto.randomUUID()} className={`${ThemeMarkdown.ltr}`}>
        {content}
      </p>
    );
  };

  const renderList = (node) => {
    const listClass = node.listType === 'bullet' ? ThemeMarkdown.list.ul : ThemeMarkdown.list.ol;
    return (
      <ul key={crypto.randomUUID()} className={listClass}>
        {node.children.map((listItem, index) => (
          <li key={index}>
            {listItem.children.map((child, index) => renderText(child, index))}
          </li>
        ))}
      </ul>
    );
  };

  const renderQuote = (node) => {
    return (
      <blockquote key={crypto.randomUUID()} className={ThemeMarkdown.quote}>
        {node.children.map((child, index) => renderText(child, index))}
      </blockquote>
    );
  };

  const renderNode = (node) => {
    switch (node.type) {
      case 'paragraph':
        return renderParagraph(node);
      case 'list':
        return renderList(node);
      case 'quote':
        return renderQuote(node);
      default:
        return null;
    }
  };

  return (
    <div>
      {children.map((node, index) => renderNode(node, index))}
    </div>
  );
};

export { MarkdownView };
