import React, {useEffect} from 'react';
import css from "@/styles/Home.module.css";

const MainHeading = () => {


    useEffect(() => {
        const inViewport = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let divs = Array.from(entry.target.children) as [HTMLElement]
                    divs.forEach((div, id) => {
                        setTimeout(() => {
                            div.classList.add(css.inViewportHeadingAnimation);
                        }, 300 * id + 1)
                    })
                }
            });
        };
        const Obs = new IntersectionObserver(inViewport,{
            threshold: .5,
        });
        document.querySelectorAll('[data-heading]').forEach(el => {
            Obs.observe(el);
        });


    }, [])

    return (
        <section className={css.heading}
                 data-heading={'true'}
        >
            <div className={`meSection`}
                 style={{marginTop: '15vw'}}
                 data-title={"Vlad Dobrinov,s"}
            >
                Vlad Dobrinov,
            </div>
            <div className={`meSection`}
                 data-title={"highly driven"}
            >
                highly driven
            </div>
            <div className={`meSection`}
                 data-title={"Front Dev"}
            >
                Front Dev
            </div>
        </section>
    );
};

export default MainHeading;