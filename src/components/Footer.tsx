
const Footer = () => {
    const links = [{
        linkname: "Home",
        url: "#home",
      },
      {
        linkname: "About",
        url: "#about",
      },
      {
        linkname:"Contact",
        url:"#contact",
      },
      ];
  return (
    <footer className='text-black dark:text-white bg-gray-200 dark:bg-gradient-to-b from-slate-900 via-slate-900 to-gray-900  font-Poppins'>
    <div className='text-center w-full py-8 font-semibold bottom-0'>
      <h1 className=" mb-6">Eventzap</h1>
      <p className=" mb-6 text-center">Made with ❤️ by Satwik Prabhu</p>
      <ul className='flex items-center justify-center space-x-20 '>
        {links.map((link)=><li key={link.linkname}>{link.linkname}</li>)}
      </ul>
    </div>
    </footer>
  );
};

export default Footer;