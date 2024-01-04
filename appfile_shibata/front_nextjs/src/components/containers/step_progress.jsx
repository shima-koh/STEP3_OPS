
"use client";
import React from 'react';

const step_progress = ({role, status}) => {

    //const [role, status] = props;


    return(
        <>

            {role === "worker" && status === "step1" && (
                <ul className="steps steps-vertical lg:steps-horizontal">
                    <li className="step step-primary">応募</li>
                    <li className="step">契約</li>
                    <li className="step">業務</li>
                    <li className="step">評価</li>
                </ul> 
            )}
            {role === "worker" && status === "step2" && (
                <ul className="steps steps-vertical lg:steps-horizontal">
                    <li className="step step-primary">応募</li>
                    <li className="step step-primary">契約</li>
                    <li className="step">業務</li>
                    <li className="step">評価</li>
                </ul> 
            )}
            {role === "worker" && status === "step3" && (
                <ul className="steps steps-vertical lg:steps-horizontal">
                    <li className="step step-primary">応募</li>
                    <li className="step step-primary">契約</li>
                    <li className="step step-primary">業務</li>
                    <li className="step">評価</li>
                </ul> 
            )}
            {role === "worker" && status === "step4" && (
                <ul className="steps steps-vertical lg:steps-horizontal">
                    <li className="step step-primary">応募</li>
                    <li className="step step-primary">契約</li>
                    <li className="step step-primary">業務</li>
                    <li className="step step-primary">評価</li>
                </ul> 
            )}
        </>

    );
};

export default step_progress;