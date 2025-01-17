const AboutTeam = () => {
  return (
    <div className="px-3 sm:px-8 lg:px-10 py-10 text-base">
      <h1 className="text-3xl font-semibold py-4">Our Team</h1>
      <p className=" lg:w-[50%] mx-auto py-2">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam impedit,
        autem quam aliquam architecto nobis quibusdam expedita amet dolore. Nisi
        ullam illum, et nostrum possimus dolor distinctio magnam sit impedit.
      </p>

      <div className="flex items-center flex-wrap w-full mx-auto lg:w-[90%] gap-10 py-16">
        <div className="w-80 h-auto mx-auto">
          <div className="w-48 rounded-full overflow-hidden h-48 border mx-auto">
            <img src="/public/images/potato-1.webp" alt="Member 1" />
          </div>
          <div className="py-5 px-4">
            <h3 className="text-2xl font-bold text-gray-700">Alex Carry</h3>
            <small>Founder & CEO</small>
            <p className="text-sm py-2 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              ratione repellendus quis nobis, exercitationem eligendi voluptate
              autem minus obcaecati magnam natus non temporibus inventore
              dignissimos facilis. Sunt optio soluta deserunt.
            </p>
          </div>
        </div>
        <div className="w-80 h-auto mx-auto">
          <div className="w-48 rounded-full overflow-hidden h-48 border mx-auto">
            <img src="/public/images/potato-1.webp" alt="Member 1" />
          </div>
          <div className="py-5 px-4">
            <h3 className="text-2xl font-bold text-gray-700">Riban Justin</h3>
            <small>Manager</small>
            <p className="text-sm py-2 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              ratione repellendus quis nobis, exercitationem eligendi voluptate
              autem minus obcaecati magnam natus non temporibus inventore
              dignissimos facilis. Sunt optio soluta deserunt.
            </p>
          </div>
        </div>
        <div className="w-80 h-auto mx-auto">
          <div className="w-48 rounded-full overflow-hidden h-48 border mx-auto">
            <img src="/public/images/potato-1.webp" alt="Member 1" />
          </div>
          <div className="py-5 px-4">
            <h3 className="text-2xl font-bold text-gray-700">Jason Carry</h3>
            <small>Manager & Supplier</small>
            <p className="text-sm py-2 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              ratione repellendus quis nobis, exercitationem eligendi voluptate
              autem minus obcaecati magnam natus non temporibus inventore
              dignissimos facilis. Sunt optio soluta deserunt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTeam;
