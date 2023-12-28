import PromptCards from "./PromptCards"

const Profile = ({ name, desc, email, data,
  handleEdit, handleDelete }) => {
    //console.log(data)
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name} Profile
        </span>
        <p className="font-inter text-sm 
          text-gray-500">{email}</p>
        
      </h1>
      <p className="desc text-left">
        {desc}
      </p>

      
     
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCards
            key={post._id}
            post={post}
            handleEdit={() =>handleEdit && handleEdit(post)} 
            handleDelete={() =>handleDelete && handleDelete(post)}/>
        ))}
      </div>
    </section>
  )
}

export default Profile
