import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";

const formatCode = (code: string) => {
  const options = {
    parser: "html",
    plugins: [parserHtml],
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
  };

  try {
    const formattedHTML = prettier.format(code, options);
    return formattedHTML;
  } catch (error) {
    return code;
  }
};

export default formatCode;
