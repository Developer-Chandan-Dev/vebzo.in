const AboutUs = () => {
  return (
    <div className="w-full px-5 sm:px-8 lg:px-10 py-20 bg-white flex-center relative">
      <div className="absolute w-full h-auto -top-[2rem] ">
        <img
          src="/public/images/basil-leaf.png"
          className="mx-auto h-16"
          alt="Leaf"
        />
      </div>
      <div className="flex gap-20 flex-wrap justify-between">
        <div className="text-left w-full sm:w-[500px] mx-auto">
          <h2 className="py-6 text-3xl font-semibold  text-gray-700 amiri-quarn">
            We Are Your Favourite Store.
          </h2>
          <p className="text-[15px] text-gray-700">
            Tuas quisquam quo gravida proident harum, aptent ligula anim
            consequuntur, ultrices mauris, nunc voluptates lobortis, varius,
            potenti placeat! Fuga omnis. Cubilia congue. Recusandae. Vero
            penatibus quasi! Nostra tenetur dignissimos ultrices natus
            distinctio ultrices consequuntur numqu.
          </p>
          <br />
          <p className="text-[15px] text-gray-700">
            Officiis fuga harum porro et? Similique rhoncus atque! Netus
            blanditiis provident nunc posuere. Rem sequi, commodo, lorem tellus
            elit, hic sem tenetur anim amet quas, malesuada proident platea
            corrupti expedita.
          </p>
        </div>
        <div className="w-full sm:w-[550px] mx-auto">
          <img src="/public/images/banner-01.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
