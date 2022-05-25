import React, { useState, useEffect } from "react";
import employee from "../../api/employee";

import { useSelector } from "react-redux";

import { Spin, Card, message, Button } from "antd";

const SalaryInfo = ({ employeeId }) => {
  const [salaryPaid, setSalaryPaid] = useState(null);

  const currentUserId = useSelector((state) => state.auth.id);

  useEffect(() => {
    employee.checkSalary(employeeId).then((data) => {
      setSalaryPaid(data.data.salaryStatus);
    });
  }, []);

  if (salaryPaid == null) {
    return <Spin />;
  }

  return (
    <Card>
      {salaryPaid ? (
        <strong>{console.log(salaryPaid)}Зарплату отримано цього місяця</strong>
      ) : (
        <div>
          <strong>Цього місяця ще не платили </strong>
          <Button
            onClick={() =>
              employee
                .paySalary(employeeId, currentUserId)
                .then(() =>
                  setSalaryPaid(true).catch((err) =>
                    message.error(err.response.data.message || err.message)
                  )
                )
            }
          >
            Заплатити
          </Button>
        </div>
      )}
    </Card>
  );
};

export default SalaryInfo;
