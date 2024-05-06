import React, {useEffect} from 'react';
import css from "@/styles/Home.module.css";

const MainHeading = () => {


    useEffect(() => {
        const inViewport = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let divs = Array.from(entry.target.children) as [HTMLElement]
                    divs.forEach((div, id) => {
                        const overlay = div.lastElementChild
                        if (overlay) {
                            div.style.animationDelay = 300 * (id + 1)+1500 + "ms"
                            div.classList.add(css.inViewportHeadingAnimation);
                            overlay.style.animationDelay = `${300 * (id + 1)+1000}ms, ${300 * (id + 1) + 2000}ms`
                            overlay.classList.add(css.temp);
                        }
                    })
                }
            });
        };
        const Obs = new IntersectionObserver(inViewport, {
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
                // data-title={"Vlad Dobrinov,"}
            >
                Vlad Dobrinov,
                <div className={'overlay'}/>
            </div>

            <div className={`meSection`}
                // data-title={"highly driven"}

            >
                highly driven
                <div className={'overlay'}/>

            </div>
            <div className={`meSection`}
                // data-title={"Front Dev"}
            >
                Front Dev
                <div className={'overlay'}/>

            </div>
        </section>
    );
};

export default MainHeading;