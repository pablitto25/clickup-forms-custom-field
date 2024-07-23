import { Input } from "@nextui-org/react";
import { useSurvey } from "@/app/form-encuesta-rework/components/content/SurveyContext";

const Encuesta_1: React.FC = () => {
  const { surveyData, setSurveyData } = useSurvey();

  return (
    <>
    <h2 className="flex justify-center text-2xl p-8">Contact Information</h2>
      <div>
        <div className="max-w-lg mx-auto">
          <Input
            isClearable
            type="text"
            label="Company"
            variant="bordered"
            placeholder="..."
            value={surveyData.company}
            onChange={(e) => setSurveyData({ company: e.target.value })}
            onClear={() => setSurveyData({ company: '' })}
            className="max-w-lg"
          />
          <Input
            isClearable
            type="text"
            label="Full Name"
            variant="bordered"
            placeholder="..."
            value={surveyData.fullName}
            onChange={(e) => setSurveyData({ fullName: e.target.value })}
            onClear={() => setSurveyData({ fullName: '' })}
            className="max-w-lg"
          />
          <Input
            isClearable
            type="email"
            label="Email"
            variant="bordered"
            placeholder="..."
            value={surveyData.email}
            onChange={(e) => setSurveyData({ email: e.target.value })}
            onClear={() => setSurveyData({ email: '' })}
            className="max-w-lg"
          />
        </div>
      </div>
    </>
  );
}

export default Encuesta_1;
