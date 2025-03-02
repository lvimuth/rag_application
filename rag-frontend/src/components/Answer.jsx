import React from 'react';
import { FaQuestionCircle, FaRobot } from 'react-icons/fa';

const Answer = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Answer</h2>

      <div className="mb-4 p-4 bg-blue-50 rounded-md">
        <div className="flex items-start">
          <FaQuestionCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
          <p className="text-gray-800">{data.question}</p>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-md">
        <div className="flex items-start">
          <FaRobot className="text-indigo-600 mt-1 mr-3 flex-shrink-0" />
          <div className="text-gray-800 answer-text">
            {data.answer.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;