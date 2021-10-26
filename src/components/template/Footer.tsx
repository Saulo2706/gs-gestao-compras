export default function Footer(){
    return(
        <>
            <footer className="footer-1 bg-gray-800 py-8 sm:py-5">
                <div className="container mx-auto px-4 text-center">
                    <div className="sm:flex sm:flex-wrap justify-center items-center">
                        <div className="sm:w-full px-4 md:w-1/6">
                            <strong className="text-white">SOL IT</strong>
                        </div>
                        <div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
                            <h6 className="font-bold mb-2 text-white">Endereço</h6>
                            <address className="not-italic mb-4 text-sm text-white">
                                Rua xxxx, Cidade xxx, CEP XXXXX-XXX
                            </address>
                        </div>
                        <div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
                            <h6 className="font-bold mb-2 text-white">Redes Sociais</h6>
                            <p className="mb-4 text-sm text-white">
                                Facebook<br/>
                                Twiter<br/>
                                LinkedIn<br/>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}