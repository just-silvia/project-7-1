import imgFb from "../assets/img-nav-footer/fbicon (1).webp";
import imgInsta from "../assets/img-nav-footer/instaicon.webp";
import imgYt from "../assets/img-nav-footer/yuoicon.webp";
import imgTt from "../assets/img-nav-footer/tikicon (1).webp";
import imgWts from "../assets/img-nav-footer/whaticon.webp";
import imgLogo from "../assets/img-nav-footer/logosara.png";

const Footer = () => {
    return (
        <footer className="bg-secondary dark:bg-black text-primary dark:text-accent pt-12 pb-8">
            <div className="w-full max-w-[1168px] mx-auto px-5">
                <div className="flex flex-col items-center justify-between md:flex-row md:items-center mb-8">
                    <div className="flex items-center mb-4 md:mb-0">
                        <img
                            src={imgLogo}
                            alt="Aquatic Paradise Logo"
                            className="h-12 w-auto mr-4"
                        />
                        <h4 className="text-2xl !text-light dark:text-secondary">Aquatic Paradise</h4>
                    </div>
                    <h6 className=" !text-light dark:text-secondary">Ten years in one click</h6>
                </div>
                <div className="flex flex-col md:flex-row justify-between border-t border-b border-gray-700 dark:border-gray-600 py-8 mb-8">
                    <div className="w-full md:w-1/3 mb-8 md:mb-0">
                        <h5 className="text-lg mb-4 !text-primary dark:text-secondary">Quick Links</h5>
                        <ul className="space-y-2">
                            <li><a href="#" className="!text-light hover:!text-accent dark:text-secondary transition-colors duration-300">Leave a review!</a></li>
                            <li><a href="#" className="!text-light hover:!text-accent dark:text-secondary transition-colors duration-300">Latest news</a></li>
                            <li><a href="#" className="!text-light hover:!text-accent dark:text-secondary transition-colors duration-300">They say about us</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 flex flex-col items-start md:items-center">
                         <h5 className="text-lg !text-primary mb-4 dark:text-secondary">Follow Us</h5>
                        <div className="flex space-x-4 items-center">
                            {/* SEZIONE ICONE SOCIAL AGGIORNATA */}
                            {/* Sostituisci il valore dell'attributo src="" con il percorso reale di ogni logo */}
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 active:opacity-75 transition-opacity duration-200">
                                <img src={imgFb} alt="Facebook Logo" className="h-12 w-auto" /> {/* Aumentato leggermente dimensioni h-8 w-auto */}
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 active:opacity-75 transition-opacity duration-200">
                                <img src={imgInsta} alt="Instagram Logo" className="h-8 w-auto" /> {/* Aumentato leggermente dimensioni */}
                            </a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 active:opacity-75 transition-opacity duration-200">
                                <img src={imgWts} alt="Twitter Logo" className="h-8 w-auto" /> {/* Aumentato leggermente dimensioni */}
                            </a>
                            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 active:opacity-75 transition-opacity duration-200">
                                <img src={imgTt} alt="X Logo" className="h-8 w-auto" /> {/* Aumentato leggermente dimensioni */}
                            </a>
                            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 active:opacity-75 transition-opacity duration-200">
                                <img src={imgYt} alt="X Logo" className="h-12 w-auto" /> {/* Aumentato leggermente dimensioni */}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    <p className="!text-primary dark:text-secondary">© 2025 Aquatic Paradise. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;