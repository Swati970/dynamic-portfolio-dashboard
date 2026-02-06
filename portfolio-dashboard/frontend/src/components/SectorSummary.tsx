
import { SectorSummary as SectorSummaryType } from "../types";

const SectorSummary = ({ sectors }: { sectors: SectorSummaryType[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {sectors.map((sector) => (
        <div key={sector.sector} className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{sector.sector}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Inv:</span>
              <span className="font-medium">{sector.totalInvestment.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Present Val:</span>
              <span className="font-medium">{sector.totalPresentValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Gain/Loss:</span>
              <span className={`font-bold ${sector.totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                {sector.totalGainLoss.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectorSummary;
