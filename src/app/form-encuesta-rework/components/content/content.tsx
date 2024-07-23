
import Survey from "./survey";
import ButtonNextPreview from "../utils/buttonsNextPreview";

const Content: React.FC = () => {
    return (
        <section className='flex flex-col items-center w-full'>
            <div className="flex justify-center items-center pb-8 w-full">
                <div className="w-full max-w-8xl mx-auto">
                    <Survey />
                </div>
            </div>
            <div>
                <ButtonNextPreview />
            </div>
        </section>
    );
};

export default Content;
