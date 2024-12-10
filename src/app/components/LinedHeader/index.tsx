export const LinedHeader = ({ headertitle }: { headertitle: string }) => {
  return (
    <div className="flex justify-center relative mb-8">
      <span className="absolute left-0 top-3 block bg-gray-dark h-px w-full mb-1"></span>
      <h2 className="font-header uppercase px-3 -mt-1 text-2xl text-center bg-gray-light z-10">
        {headertitle}
      </h2>
    </div>
  );
};
