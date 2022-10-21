import { useState } from "react";
import { Form, Field } from "react-final-form";
import { Input, PageTitle, Button } from "../../stories";
import { postNewLeave } from "../../APIs";
import { getData } from "../../Util/Helper";
import { Theme } from "../../Theme";
import style from "./LeaveRequest.module.scss";

type fieldInputType = {
  leavefrom?: string | undefined;
  leaveto?: string | undefined;
  leavedate?: string | undefined;
  reason?: "Other" | "Sick Leave";
  leavetype?: "Unpaid" | "Paid";
  leaveduration?: "multipleday" | "singleday" | "halfday";
  otherremark?: string;
};

function LeaveRequest({ logindate }: { logindate: string }) {
  const [radioValue, setRadioValue] = useState(true);

  const onSubmit = (e: fieldInputType) => {
    let newLeave = {};
    if (e.leaveduration === "multipleday") {
      newLeave = {
        startDate: e.leavefrom,
        endDate: e.leaveto,
        comments: e.otherremark,
        leaveTypeId:
          e.leavetype === "Paid" ? 1 : e.leavetype === "Unpaid" ? 2 : 3,
        leaveReasonId: e.reason === "Sick Leave" ? 1 : 3,
        type: "multiple",
      };
    } else {
      newLeave = {
        startDate: e.leavedate,
        comments: e.otherremark,
        leaveTypeId:
          e.leavetype === "Paid" ? 1 : e.leavetype === "Unpaid" ? 2 : 3,
        leaveReasonId: e.reason === "Sick Leave" ? 1 : 3,
        type: e.leaveduration === "halfday" ? "half" : "single",
      };
    }

    const loginData = getData("loginData");
    const config = {
      headers: { Authorization: `Bearer ${loginData.token}` },
    };
    postNewLeave(config, newLeave)
      .then()
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  const validate = (e: fieldInputType) => {
    const errors: fieldInputType = {};

    if (radioValue) {
      if (!e.leavefrom) {
        errors.leavefrom = "Please enter date";
      }
      if (!e.leaveto) {
        errors.leaveto = "Please enter date";
      }
      if (e.leavefrom! > e.leaveto!) {
        errors.leavefrom = "Leave From date must be less than Leave To date";
        errors.leaveto = "Leave To date must be higher than Leave From date";
      }
    } else {
      if (!e.leavedate) {
        errors.leavedate = "Please enter a date from leavedate";
      }
    }

    if (!e.otherremark) {
      errors.otherremark = "Please enter other remark";
    }

    return errors;
  };

  return (
    <div>
      <PageTitle
        logindate={logindate}
        pagename={"Leaves"}
        isinnerPage={true}
        isButton={false}
        innerPageNames={["Leave Request"]}
      />
      <div className={style.py30}>
        <div className={style.leaverequestform}>
          <h2>Apply Leave</h2>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={{
              reason: "Other",
              leavetype: "Paid",
              leaveduration: "multipleday",
            }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className={style.leavetypeselector}>
                  <div className={style.radioinputs}>
                    <Field
                      name="leaveduration"
                      component="input"
                      type="radio"
                      value="multipleday"
                      onClick={() => setRadioValue(true)}
                    />
                    <label>Multiple Day</label>
                  </div>
                  <div className={style.radioinputs}>
                    <Field
                      name="leaveduration"
                      component="input"
                      type="radio"
                      value="singleday"
                      onClick={() => setRadioValue(false)}
                    />
                    <label>Single Day</label>
                  </div>
                  <div className={style.radioinputs}>
                    <Field
                      name="leaveduration"
                      component="input"
                      type="radio"
                      value="halfday"
                      onClick={() => setRadioValue(false)}
                    />
                    <label>Half Day</label>
                  </div>
                </div>

                <div className={style.inputfields}>
                  {radioValue ? (
                    <div className={style.displayflex}>
                      <div className={style.displayinnerflex}>
                        <div className={style.inputcontrol}>
                          <Field name="leavefrom">
                            {(e) => (
                              <div>
                                <label htmlFor="leavefrom">Leave From</label>
                                <Input
                                  id="leavefrom"
                                  type="date"
                                  placeholder="Select Date"
                                  inputtype=""
                                  padding={"1.4rem 1.8rem 1.4rem 1.9rem"}
                                  width="44rem"
                                  onChange={e.input.onChange}
                                  onBlur={e.input.onBlur}
                                  onFocus={e.input.onFocus}
                                />
                                {e.meta.error && e.meta.touched && (
                                  <span className={style.error}>
                                    {e.meta.error}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>
                        <div className={style.inputcontrol}>
                          <Field name="leaveto">
                            {(e) => (
                              <div>
                                <label htmlFor="leaveto">Leave To</label>
                                <Input
                                  id="leaveto"
                                  type="date"
                                  placeholder="Select Date"
                                  inputtype=""
                                  padding={"1.4rem 1.8rem 1.4rem 1.9rem"}
                                  width="44rem"
                                  onChange={e.input.onChange}
                                  onBlur={e.input.onBlur}
                                  onFocus={e.input.onFocus}
                                />
                                {e.meta.error && e.meta.touched && (
                                  <span className={style.error}>
                                    {e.meta.error}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>

                        <div className={style.inputcontrol}>
                          <label htmlFor="reason">Reason</label>
                          <Field
                            name="reason"
                            component="select"
                            className={style.dropdown}
                          >
                            <option>Sick Leave</option>
                            <option>Other</option>
                          </Field>
                        </div>
                      </div>
                      <div className={style.displayinnerflex}>
                        <div className={style.inputcontrol}>
                          <label htmlFor="reason">Leave Type</label>
                          <Field
                            name="leavetype"
                            component="select"
                            className={style.dropdown}
                          >
                            <option>Paid</option>
                            <option>Unpaid</option>
                          </Field>
                        </div>

                        <div className={style.inputcontrol}>
                          <Field name="otherremark">
                            {(e) => (
                              <div>
                                <label htmlFor="otherremark">
                                  Other Remark
                                </label>
                                <Input
                                  id="otherremark"
                                  type="text"
                                  placeholder="Remark"
                                  inputtype=""
                                  padding={"1.4rem 1.8rem 1.4rem 1.9rem"}
                                  width="91rem"
                                  onChange={e.input.onChange}
                                  onBlur={e.input.onBlur}
                                  onFocus={e.input.onFocus}
                                />
                                {e.meta.error && e.meta.touched && (
                                  <span className={style.error}>
                                    {e.meta.error}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={style.displayflex}>
                      <div className={style.displayinnerflex}>
                        <div className={style.inputcontrol}>
                          <Field name="leavedate">
                            {(e) => (
                              <div>
                                <label htmlFor="leavedate">Leave Date</label>
                                <Input
                                  id="leavedate"
                                  type="date"
                                  placeholder="Select Date"
                                  inputtype=""
                                  padding={"1.4rem 1.8rem 1.4rem 1.9rem"}
                                  width="44rem"
                                  onChange={e.input.onChange}
                                  onBlur={e.input.onBlur}
                                  onFocus={e.input.onFocus}
                                />
                                {e.meta.error && e.meta.touched && (
                                  <span className={style.error}>
                                    {e.meta.error}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>

                        <div className={style.inputcontrol}>
                          <label htmlFor="reason">Leave Type</label>
                          <Field
                            name="leavetype"
                            component="select"
                            className={style.dropdown}
                          >
                            <option>Paid</option>
                            <option>Unpaid</option>
                          </Field>
                        </div>

                        <div className={style.inputcontrol}>
                          <label htmlFor="reason">Reason</label>
                          <Field
                            name="reason"
                            component="select"
                            className={style.dropdown}
                          >
                            <option>Sick Leave</option>
                            <option>Other</option>
                          </Field>
                        </div>
                      </div>
                      <div className={style.inputcontrol}>
                        <Field name="otherremark">
                          {(e) => (
                            <div>
                              <label htmlFor="otherremark">Other Remark</label>
                              <Input
                                id="otherremark"
                                type="text"
                                placeholder="Remark"
                                inputtype=""
                                padding={"1.4rem 1.8rem 1.4rem 1.9rem"}
                                width="91rem"
                                onChange={e.input.onChange}
                                onBlur={e.input.onBlur}
                                onFocus={e.input.onFocus}
                              />
                              {e.meta.error && e.meta.touched && (
                                <span className={style.error}>
                                  {e.meta.error}
                                </span>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  label="Submit"
                  type="submit"
                  borderRadius={false}
                  color={Theme.colors.whiteColor}
                />
                <Button
                  label="Cancel"
                  type="reset"
                  borderRadius={false}
                  color={Theme.colors.yankeesBlueColor}
                  bgColor={Theme.colors.lotionColor}
                  border={`solid 0.2rem ${Theme.colors.brightGrayColor}`}
                />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default LeaveRequest;
