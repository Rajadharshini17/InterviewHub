export default function ExperienceCard({ exp, onLike }) {
  return (
    <div className="d-flex justify-content-between mt-2">
 
  <button
    className="btn btn-light btn-sm"
    onClick={(e) => {
      e.stopPropagation();
      handleLike(exp.id);
    }}
  >
    👍 {exp.likes}
  </button>
 
  <button
    className="btn btn-light btn-sm"
    onClick={(e) => {
      e.stopPropagation();
      handleDislike(exp.id);
    }}
  >
    👎 {exp.dislikes}
  </button>
 
</div>
 
  );
}