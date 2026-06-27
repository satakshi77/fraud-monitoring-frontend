import { useEffect, useState } from "react";
import API from "../services/api.js"

export default function AlertCard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await API.get("/alerts");
      setAlerts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="
    bg-white
    rounded-xl
    shadow
    p-5
    mt-6
    ">

      <h2 className="
      text-xl
      font-semibold
      mb-4
      text-slate-700
      ">
        Alert History
      </h2>

      {alerts.length === 0 ? (
        <p className="text-gray-500">
          No alerts found
        </p>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert._id}
            className="
            border-b
            py-4
            flex
            justify-between
            items-center
            "
          >
            <div>

              <p className="font-medium text-slate-800">
                {alert.message}
              </p>

              <div className="
              flex
              gap-3
              mt-1
              text-sm
              text-gray-500
              ">

                <span>
                  Severity:
                  <span className={`
                    ml-1 font-medium
                    ${
                      alert.severity==="high"
                      ? "text-red-600"
                      : alert.severity==="medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                    }
                  `}>
                    {alert.severity}
                  </span>
                </span>

                   <span>
          {
            new Date(alert.createdAt).toLocaleString()
           }
        </span>

              </div>

            </div>

            <div>
              {alert.isRead ? (
                <span className="
                bg-green-100
                text-green-700
                px-3
                py-1
                rounded-full
                text-xs
                ">
                  Read
                </span>
              ) : (
                <span className="
                bg-red-100
                text-red-700
                px-3
                py-1
                rounded-full
                text-xs
                ">
                  Unread
                </span>
              )}
            </div>

          </div>
        ))
      )}

    </div>
  );
}