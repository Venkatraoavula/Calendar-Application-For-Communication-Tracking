//!!! OVERUSED COMMENTS ALERT
import React from 'react';
//!!!!!!!!! LUCIDE COMPONENTS IMPORTED
import { Clock, AlertCircle } from 'lucide-react';

const NotificationsView = ({
  companies = [], // default to empty
  overriddenCommunications = [],
  setOverriddenCommunications,
}) => {
  const getNotifications = () => {
    const tdy = new Date(); // Today
    tdy.setHours(0, 0, 0, 0); // set all to 0
    let overdueC = [];
    let todC = []; // today comms

    companies.forEach((cmp) => {
      const next = cmp.communications?.[0];
      if (next) {
        const nxtD = new Date(next.date); // nextDate
        nxtD.setHours(0, 0, 0, 0); // normalize
        if (nxtD < tdy) {
          overdueC.push({
            company: cmp,
            daysOverdue: Math.floor((tdy - nxtD) / (1000 * 60 * 60 * 24)),
            commDate: next.date,
            notes: next.notes || 'No notes!',
          });
        } else if (
          nxtD.getDate() === tdy.getDate() &&
          nxtD.getMonth() === tdy.getMonth() &&
          nxtD.getFullYear() === tdy.getFullYear()
        ) {
          todC.push({
            company: cmp,
            commDate: next.date,
            notes: next.notes || 'No notes!',
          });
        }
      }
    });
    // RETURNING BOTH
    return { overdueComms: overdueC, todayComms: todC };
  };

  const { overdueComms, todayComms } = getNotifications();
  // FUNCTION FOR TOGGLING
  const toggleOverride = (cid, cDate, e) => {
    e.stopPropagation(); // stop propagate
    const uid = `${cid}-${cDate}`; // unique ID
    if (overriddenCommunications.includes(uid)) {
      setOverriddenCommunications(
        overriddenCommunications.filter((id) => id !== uid) // remove
      );
    } else {
      setOverriddenCommunications([...overriddenCommunications, uid]); // add
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Summary CARDS  */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* OVERDUE */}
        <div className="bg-red-50 p-6 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-red-700">
              Overdue Communications
            </h3>
          </div>
          <p className="mt-4 text-3xl font-bold text-red-700">
            {overdueComms.length}
          </p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-yellow-700">
              Due Today
            </h3>
          </div>
          <p className="mt-4 text-3xl font-bold text-yellow-700">
            {todayComms.length}
          </p>
        </div>
      </div>

      {/* LISTS */}
      <div className="space-y-12">
        {/* OVERDUE SECTION */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-red-600 mb-6">
            Overdue Communications
          </h3>
          <div className="space-y-4">
            {overdueComms.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No overdue communications
              </p>
            ) : (
              overdueComms.map(({
                company,
                daysOverdue,
                commDate,
                notes,
              }, i) => {
                const id = `${company.id}-${commDate}`;
                const isOverridden = overriddenCommunications.includes(id);
                return (
                  <div
                    key={i}
                    className={`relative group ${
                      isOverridden ? 'bg-red-100' : 'bg-red-50'
                    } rounded-lg p-4 border-l-4 ${
                      isOverridden ? 'border-gray-300' : 'border-red-500'
                    } flex justify-between items-center hover:shadow-md`}
                  >
                    <div className="flex-1">
                      <div className="text-lg font-medium text-blue-600">
                        {company.name}
                      </div>
                      <div className="text-sm text-blue-600 mt-1">
                        Last communication: {new Date(commDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-red-600 mt-1">
                        {daysOverdue} {daysOverdue === 1 ? 'day' : 'days'} overdue
                      </div>
                    </div>
                    <button
                      onClick={(e) => toggleOverride(company.id, commDate, e)}
                      className={`ml-4 text-sm ${
                        isOverridden ? 'text-gray-500' : 'text-red-600'
                      } underline hover:bg-red-100 px-3 py-1`}
                    >
                      {isOverridden ? 'Enable Highlight' : 'Disable Highlight'}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {/* DUE TODAY SECTION */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-yellow-600 mb-6">
            Due Today
          </h3>
          <div className="space-y-4">
            {todayComms.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No communications due today
              </p>
            ) : (
              todayComms.map(({ company, commDate, notes }, i) => {
                const id = `${company.id}-${commDate}`;
                const isOverridden = overriddenCommunications.includes(id);
                return (
                  <div
                    key={i}
                    className={`relative group ${
                      isOverridden ? 'bg-yellow-100' : 'bg-yellow-50'
                    } rounded-lg p-4 border-l-4 ${
                      isOverridden ? 'border-gray-300' : 'border-yellow-500'
                    } flex justify-between items-center hover:shadow-md`}
                  >
                    <div className="flex-1">
                      <div className="text-lg font-medium text-blue-600">
                        {company.name}
                      </div>
                      <div className="text-sm text-blue-600 mt-1">
                        Due: {new Date(commDate).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => toggleOverride(company.id, commDate, e)}
                      className={`ml-4 text-sm ${
                        isOverridden ? 'text-gray-500' : 'text-yellow-600'
                      } underline hover:bg-yellow-100 px-3 py-1`}
                    >
                      {isOverridden ? 'Enable Highlight' : 'Disable Highlight'}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotificationsView;
