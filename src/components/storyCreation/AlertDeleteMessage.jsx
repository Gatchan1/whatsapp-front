export default function AlertDeleteMessage({setShowDeleteAlert, deleteMessage}) {
  
  return (
    <div>
      <form onSubmit={deleteMessage}>
        <p>Are you sure?</p>
        <button type="submit">
          Yes, delete
        </button>
        <button type="button" onClick={()=>setShowDeleteAlert(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
}
