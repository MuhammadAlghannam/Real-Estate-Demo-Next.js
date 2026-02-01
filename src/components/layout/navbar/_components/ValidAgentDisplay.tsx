"use client";

import { Phone } from "lucide-react";

interface ValidAgentDisplayProps {
  agent: AgentData;
}

export default function ValidAgentDisplay({ agent }: ValidAgentDisplayProps) {
  return (
    <div className="sm:p-6 p-4 border border-success rounded-lg bg-[#E8FFEB]">
      <h3 className="sm:text-h4-semibold text-h6-semibold text-success">✅ This Agent is Official</h3>

      <div className="mt-4">
        {/* Agent Details */}
        <h3 className="sm:text-h6-semibold text-h7-semibold text-black">{agent.name}</h3>

        {agent.title && (
          <p className="sm:text-h6-regular text-h7-regular text-text-gray-dark">
            {agent.title}
          </p>
        )}
      </div>

      {/* Contact Information */}
      <div className="w-full space-y-3 mt-4">
        {/* {agent.email && (
          <a
            href={`mailto:${agent.email}`}
            className="flex items-center space-x-3"
          >
            <Mail className="sm:w-5 sm:h-5 w-4 h-4 text-black" />
            <span className="sm:text-h6-regular text-h7-regular text-black">
              {agent.email}
            </span>
          </a>
        )} */}

        {agent.phones && agent.phones.length > 0 && (
          <div className="space-y-2">
            {agent.phones.map((phoneItem) => (
              <a
                key={phoneItem.id}
                href={`tel:${phoneItem.phone}`}
                className="flex items-center space-x-3"
              >
                <Phone className="sm:w-5 sm:h-5 w-4 h-4 text-black" />
                <span className="sm:text-h6-regular text-h7-regular text-black">
                  {phoneItem.phone}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

