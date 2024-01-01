/**
 * If bundle size is important could be replace with native element
 */
import ReactMarkdown from "react-markdown";

interface HighlightFilterTextProps {
    filterText: string;
    text: string;
}
const HighlightFilterText: React.FC<HighlightFilterTextProps> = ({
    text,
    filterText,
}) => {
    const highlightedText =
        filterText?.trim()?.length > 0
            ? text.replace(
                  new RegExp(filterText, "gi"),
                  /**
                   * using html like <b>${match}</b> may cause security risk if it combined with setDangerousInnerHtml
                   */
                  match => `\`${match}\``
              )
            : text;
    return (
        <ReactMarkdown
            children={highlightedText}
            className="[&>p>code]:bg-yellow-200 [&>p>code]:font-sans [&>p>code]:font-bold"
        />
    );
};

export default HighlightFilterText;
