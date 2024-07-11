
import { Button } from "@nextui-org/react";
import Survey from "./survey";
import { useState } from "react";
import ButtonNextPreview from "../utils/buttonsNextPreview";

const Content: React.FC = () => {
    return (
        <section className='flex flex-col justify-center items-center'>
            <div>
                <h1 className="text-3xl pt-12">Encuesta Latamly</h1>
            </div>
            <div>
                <Survey />
            </div>
            <div>
                <ButtonNextPreview />
            </div>
        </section>
    );
};

export default Content;
