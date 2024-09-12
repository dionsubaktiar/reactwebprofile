interface DataPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const CardPosts: React.FC<DataPost> = ({ userId, id, title, body }) => {
  return (
    <div
      className="container mx-auto px-3 py-2 bg-customGreen-default border-eggplant border-1
    rounded-lg shadow hover:bg-customGreen-light hover:dark:bg-customGreen-light 
    hover:dark:text-eggplant hover:text-customGreen-dark
     dark:bg-customGreen-dark text-eggplant dark:text-honeyDew mb-3"
    >
      <div className="justify-between flex items-center">
        <p>ID : {id}</p>
        <p className="pr-2">User ID : {userId}</p>
      </div>
      <p className="uppercase">Title : {title}</p>
      <p className="text-justify">Body : {body}</p>
    </div>
  );
};

export default CardPosts;
