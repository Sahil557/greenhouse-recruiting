import React from "react";
import type { Candidate } from "../types/candidate";

interface TableProps {
  data: Candidate[];
}

const Table = ({ data }: TableProps) => {
  return (
    <table className="w-full border-collapse text-left text-sm text-gray-700">
      <thead>
        <tr className="border rounded-t border-gray-200">
          <th className="py-2 px-4 text-gray-400 w-1/4">Name</th>
          <th className="py-2 px-4 border-l border-gray-200 text-gray-400">
            Job/Status
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((candidate) => (
          <React.Fragment key={candidate.id}>
            <tr className="border-b border-gray-200 bg-white cursor-default">
              <td className="pt-4 pb-2 px-4 align-top">
                <div className="font-semibold">{candidate.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {candidate.company}
                </div>
                {candidate.additionalInfo && (
                  <tr>
                    <td colSpan={2} className="py-3 px-4 text-gray-600">
                      <div className="my-4">
                        Availability{" "}
                        <a
                          href={candidate.additionalInfo.requestLink}
                          className="text-success underline underline-offset-3 decoration-1"
                        >
                          {candidate.additionalInfo.availabilityText}
                        </a>{" "}
                      </div>
                    </td>
                  </tr>
                )}
                {candidate.designation && (
                  <div className="text-xs mt-8">{candidate.designation}</div>
                )}
                {candidate?.interviews?.map((interview, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div>{interview.type}</div>
                  </div>
                ))}
              </td>
              <td className="pt-4 pb-2 px-4">
                <div>
                  <span>{candidate.jobTitle}</span>{" "}
                  <span>{candidate.jobCode}</span>
                </div>
                <div className="text-xs mt-1 text-gray-400">
                  <div>{candidate.statusNotes} </div>
                </div>
                {candidate.statusActionText && (
                  <div className="mt-8">
                    {candidate.statusActionText && (
                      <a
                        href={candidate.statusActionLink}
                        className="text-success hover:underline cursor-pointer"
                      >
                        {candidate.statusActionText}
                      </a>
                    )}
                  </div>
                )}
                {candidate.additionalInfo && (
                  <tr className="bg-white">
                    <td colSpan={2} className="py-3 px-4 text-gray-600">
                      <div className="my-4">
                        <a
                          href={candidate.additionalInfo.requestLink}
                          className="text-success hover:underline"
                        >
                          Request Availability
                        </a>
                      </div>
                    </td>
                  </tr>
                )}
                {candidate?.interviews?.map((interview, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <a
                      href={interview.manualLink}
                      className="text-success hover:underline"
                    >
                      Schedule manually
                    </a>
                    <span>|</span>
                    <div>
                    <a
                      href={interview.autoLink}
                      className="text-success hover:underline"
                    >
                      Automated scheduling
                    </a>
                    <span> | </span>
                    <button className="ml-auto text-abyss font-bold cursor-pointer">
                      ...
                    </button>
                    </div>
                  </div>
                ))}
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
