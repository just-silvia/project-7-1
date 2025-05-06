import React from "react";



const FooterObj = () => {


    const obj= [
        {
            id: "section1",
            title: "Company",
            links: [
                {
                    name: "Home",
                    link: "#"
                },
                {
                    name: "Find offers",
                    link: "#"
                },
                {
                    name: "Discover Projects",
                    link: "#"
                },
                {
                    name: "Our Portfolio",
                    link: "#"
                },
                {
                    name: "About us",
                    link: "#"
                },
            ]

        },
        {
            id: "section2",
            title: "Help and suport",
            links: [
                {
                    name: "Contact Us",
                    link: "#"
                },
                {
                    name: "How it works",
                    link: "#"
                },
                {
                    name: "Terms and Conditions",
                    link: "#"
                },
                {
                    name: "Our Portfolio",
                    link: "#"
                },
                {
                    name: "Company Policy",
                    link: "#"
                },
                {
                    name: "Money Back",
                    link: "#"
                },
            ]

        },
        {
            id: "section3",
            title: "Follow us on",
            links: [
                {
                    name: "Facebook",
                    link: "#",
                    icon: <i class="fa-brands fa-facebook"></i>
                },
                {
                    name: "Instagram",
                    link: "#",
                    icon: <i class="fa-brands fa-facebook"></i>
                },
                {
                    name: "Whatsapp",
                    link: "#",
                    icon: <i class="fa-brands fa-facebook"></i>
                },
                {
                    name: "TikTok",
                    link: "#",
                    icon: <i class="fa-brands fa-facebook"></i>
                },
                {},

            ]

        }
    ]
    return (

        <>
            <table className="bg-[] text-[] ">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>links</th>

                    </tr>
            </thead>

                <tbody>

                    {obj.map((item)=>(
                        <tr key={item.id}>
                            <td >{item.id}</td>
                            
                            <td>{item.title}</td>
                            
                            <td>{item.links.name}
                            {item.links.link}
                            </td>

                        </tr>
                    ))
                }


                </tbody>
            </table >
        

                    

        </>
    )
}
export default FooterObj;