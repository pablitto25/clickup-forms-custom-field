import { Input } from "@nextui-org/react";


const Encuesta_1: React.FC = ({ }) => {





    return (
        <div>
            <Input
                isClearable
                type="text"
                label="Company"
                variant="bordered"
                placeholder="escribir"
                onClear={() => console.log("input cleared")}
                className="max-w-lg"
            />
            <Input
                isClearable
                type="text"
                label="Full Name"
                variant="bordered"
                placeholder="escribe"
                onClear={() => console.log("input cleared")}
                className="max-w-lg"
            />
            <Input
                isClearable
                type="email"
                label="Email"
                variant="bordered"
                placeholder="Enter your email"
                onClear={() => console.log("input cleared")}
                className="max-w-lg"
            />
        </div>
    )
}

export default Encuesta_1;
