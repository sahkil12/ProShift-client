import quoteIcon from "../../../../../public/assets/Others/reviewQuote.png";

const ReviewCard = ({ review, isActive }) => {
    return (
       <div
      className={`transition-all duration-600 rounded-2xl my-4 p-10 bg-white shadow-md border border-neutral-200 
        ${isActive ? "opacity-100 scale-100 -translate-y-4": "opacity-35 scale-90"}
      `}
    >
      <img src={quoteIcon} alt="quote" className="w-10 mb-4" />
      <p className="text-gray-700 mb-6 text-lg">
        {review.text}
      </p>
        <div className="border-dashed mb-5 py-2 border-b-2 border-cyan-900"></div>
      <div className="flex items-center gap-5 mt-5">
        <img
          src={review.userImg}
          alt={review.name}
          className="w-13 h-13 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-lg text-cyan-950">{review.name}</h4>
          <p className="text-base text-gray-600">{review.role}</p>
        </div>
      </div>
    </div>
    );
};

export default ReviewCard;