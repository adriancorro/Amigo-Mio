import React , { useState } from "react";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import slides_1 from '../assets/images/slides_1.JPG';
import slides_2 from '../assets/images/slides_2.png';
import slides_3 from '../assets/images/slides_3.png';
import slides_4 from '../assets/images/slides_4.png';
import slides_5 from '../assets/images/slides_5.png';
import slides_6 from '../assets/images/slides_6.png';
import amic_meu_column2 from '../assets/images/amic_meu_column2.png';
const Section = () => {

    let ty = 0


    let slides = [slides_1 , slides_2 , slides_3, slides_4, slides_5, slides_6]
    const [orders, setOrders] = useState(0);

    return (
        <section id="section" >
            <div className="mainprincipal">
                <div className="twocolumns">
                    <div className="twocolumnsFirstColumn">
                   

                    
                    <AwesomeSlider>
                        <div data-src={slides_1} />
                        <div data-src={slides_2} />
                        <div data-src={slides_3} />
                        <div data-src={slides_4} />
                        <div data-src={slides_5} />
                        <div data-src={slides_6} />
                    </AwesomeSlider>
                            
                             
                        <br></br>
                        <iframe className ="paddingBottonImg spaceTop responsive-v" width="520rem" height="400rem" src="https://www.youtube.com/embed/L1Sb6KYIqB0?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>

                    <div className="" >
                        <h1 className="hcolumn">
                            What is Amigo mío?

                        </h1>
                        <p className="twoColumnFirst">The book My friend! It explains the journey of refugees through illustrations made by the children themselves. It is an Open Cultural Center project, the objective of which is to increase awareness and awareness of the situation of millions of people displaced as a result of the war.</p>
                        <p className="twoColumn">
                            Abdul, Elaf, Amar, among others, are some of the boys and girls from the countryside of the Cherso homes, in Northern Greece, who draw and explain their experience and who sign the story of My friend! to address the volunteers who were collaborating in the field. </p>
                        <p className="twoColumn">The book is made up of illustrations and small extracts from the personal stories of the boys and girls. It is divided into four parts: His life in Syria, before and after the war; your trip to Europe; their life in the fields in Greece and the future they await.
                            These chapters are complemented by a prologue, written by Màrius Serra in the Catalan version and by Rosa Montero in the Spanish edition, a short introduction contextualizing the problem as well as the epilogue that exposes the current situation of refugees. The book is aimed mainly at a children's audience, but also intended for adults. It has been designed for the Lluís Torres Studio and printed for the Maculart Group.</p>
                        <p className="twoColumn">The book, part of a tool to raise awareness about the issues of the migration crisis, has also been used as an educational resource in schools. Teachers can use it in their classes, along with the guide. The price of the book is € 10 and the benefits go directly to the integration activities and educational support that the Open Cultural Center is carrying out in Greece. If necessary, you can find the pedagogical guide<a href="https://openculturalcenter.org/wp-content/uploads/2018/12/Amigo-Mio_Guia-Didactica.pdf"  target="_blank"  rel="noreferrer"> here. </a></p>
                        <p className=""></p>

                    </div>

                </div>
            </div>
        </section>

    );
};

export default Section;
