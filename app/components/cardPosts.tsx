interface DataPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const CardPosts: React.FC<DataPost> = ({ userId, id, title, body }) => {
  return (
    <div
      className="p-5 bg-customGreen-default rounded-lg border border-eggplant 
        shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out
        hover:bg-customGreen-light dark:bg-customGreen-dark 
        hover:dark:bg-customGreen-light text-eggplant dark:text-honeyDew"
    >
      {/* Post Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium">
          <strong>ID:</strong> {id}
        </span>
        <span className="text-sm font-medium">
          <strong>User ID:</strong> {userId}
        </span>
      </div>

      {/* Post Title */}
      <h3 className="text-lg font-semibold text-eggplant dark:text-honeyDew uppercase mb-2">
        {title}
      </h3>

      {/* Post Body */}
      <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
        {body}
      </p>
    </div>
  );
};

export default CardPosts;
