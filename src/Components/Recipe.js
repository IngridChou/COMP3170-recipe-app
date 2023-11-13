
export default function Recipe(props) {
  const recipe = props.recipe;

  function handleDelete() {
    props.remove(recipe);
  }

  function handleStatusChange() {
    props.toggleFinished(recipe);
  }

  return (
    <li className="recipe">
      <div className="recipe-details">
        <p>
          <span>
            <input
              type="checkbox"
              onChange={handleStatusChange}
              value={recipe.finished}
            />
            {recipe.finished === true ? <del>{recipe.title}</del> : recipe.title}
          </span>
        </p>
      </div>
      <div onClick={handleDelete}>
        <button className="edit-btn" onClick={() => props.setEditing(recipe.id)}>
          edit
        </button>
        <button>remove</button>
      </div>
    </li>
  );
}
