import React from 'react';
import css from "@/styles/Home.module.css";

const MainHeading = () => {
    return (
        <section className={css.heading}>
            <div className={`meSection`}
                 style={{marginTop: '15vw'}}
                 // style={{marginTop: '13rem'}}
                 data-title={"Vlad Dobrinov,s"}
                 data-inviewport={'heading'}>
                Vlad Dobrinov,
            </div>
            <div className={`meSection`}
                 data-title={"highly driven"}
                 data-inviewport={'heading'}>
                highly driven
            </div>
            <div className={`meSection`}
                 data-title={"Front Dev"}
                 data-inviewport={'heading'}>
                Front Dev
            </div>
        </section>
    );
};

export default MainHeading;