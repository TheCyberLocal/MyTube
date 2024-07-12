import "./BlankPage.css";

function BlankPage({ content }) {
  return (
    <div className="blank-page">
      <div className="content-wrapper">{content}</div>
    </div>
  );
}

export default BlankPage;
