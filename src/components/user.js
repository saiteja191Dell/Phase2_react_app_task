  const User=({match})=>{
    return(
      <div>
        <h2>User page</h2>
        <p>Hello bro {match.params.username}</p>
      </div>
    )
  }

  export default User;