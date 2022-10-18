import { useEffect, useState } from "react";
import {
  ChangePassword,
  LocalAddress,
  PermanentAddress,
  ProfileDetails,
} from "../../components";
import { PageTitle } from "../../stories";
import { getData } from "../../Util/Helper";
import { ProfileDetailType } from "../../Types";
import { callProfilePageGet } from "../../APIs";
import ProfilePageStyle from "./Profile.module.scss";

const ProfilePage = () => {
  const [toggler, setToggler] = useState({
    proDetailToggler: false,
    locAddToggler: false,
    perAddressToggler: false,
    pwdToggler: false,
  });
  const userInfo = getData("loginData");
  const [profileDetail, setProfileDetail] = useState<ProfileDetailType>();
  const [addressdata, setAddressData] = useState({
    localAdd: {},
    permanentAddress: {},
  });

  useEffect(() => {
    callProfilePageGet(userInfo.data.user.id, {
      headers: { Authorization: "bearer " + userInfo.token },
    })
      .then((Response) => {
        const requiredData = Response.data.payload.data.employee;
        setProfileDetail({
          firstName: requiredData.firstName,
          lastName: requiredData.lastName,
          email: requiredData.email,
          mobileNo: requiredData.mobileNo,
          gender: requiredData.gender,
          department: requiredData.departmentId,
          designation: requiredData.designation,
          landlineNo: requiredData?.landlineNo,
          dateOfBirth: requiredData?.dob,
          localCity: requiredData?.localCity,
          localState: requiredData?.localState,
        });
        setAddressData({
          localAdd: {
            firstName: requiredData?.firstName,
            lastName: requiredData?.lastName,
            localAddress: requiredData?.localAddress,
            localAddress2: requiredData?.localAddress2,
            city: requiredData?.localCity,
            state: requiredData?.localSate,
            pincode: requiredData?.localPincode,
          },
          permanentAddress: {
            firstName: requiredData?.firstName,
            lastName: requiredData?.lastName,
            perAddress: requiredData?.permanentAddress,
            perAddress2: requiredData?.permanentAddress2,
            city: requiredData?.permanentCity,
            state: requiredData?.permanentState,
            pincode: requiredData?.permanentPincode,
          },
        });
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <>
      <PageTitle
        logindate={userInfo.data.user.lastLogin.split(' ')[0]}
        pagename={"Profile"}
        isinnerPage={false}
        isButton={false}
      />
      <section className={ProfilePageStyle.profile}>
        <div className={ProfilePageStyle.profile__background}>
          <div className={ProfilePageStyle.profileDetails}>
            <div
              className={ProfilePageStyle.profileDetails__header}
              onClick={() => {
                setToggler((previous) => {
                  return {
                    ...previous,
                    proDetailToggler: !previous.proDetailToggler,
                  };
                });
              }}
            >
              {toggler.proDetailToggler ? (
                <h1>- Profile Details</h1>
              ) : (
                <h1>+ Profile Details</h1>
              )}
            </div>
            <div className={ProfilePageStyle.profileDetails__body}>
              {toggler.proDetailToggler ? (
                <ProfileDetails profileData={profileDetail} />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={ProfilePageStyle.localAddress}>
            <div
              className={ProfilePageStyle.localAddress__header}
              onClick={() => {
                setToggler((previous) => {
                  return {
                    ...previous,
                    locAddToggler: !previous.locAddToggler,
                  };
                });
              }}
            >
              {toggler.locAddToggler ? (
                <h1>- Local Address</h1>
              ) : (
                <h1>+ Local Address</h1>
              )}
            </div>
            <div className={ProfilePageStyle.localAddress__body}>
              {toggler.locAddToggler ? (
                <LocalAddress localAdd={addressdata.localAdd} />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={ProfilePageStyle.perAddress}>
            <div
              className={ProfilePageStyle.perAddress__header}
              onClick={() => {
                setToggler((previous) => {
                  return {
                    ...previous,
                    perAddressToggler: !previous.perAddressToggler,
                  };
                });
              }}
            >
              {toggler.perAddressToggler ? (
                <h1>- Permanent Address</h1>
              ) : (
                <h1>+ Permanent Address</h1>
              )}
            </div>
            <div className={ProfilePageStyle.perAddress__body}>
              {toggler.perAddressToggler ? (
                <PermanentAddress permanentAdd={addressdata.permanentAddress} />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={ProfilePageStyle.changePwd}>
            <div
              className={ProfilePageStyle.changePwd__header}
              onClick={() => {
                setToggler((previous) => {
                  return {
                    ...previous,
                    pwdToggler: !previous.pwdToggler,
                  };
                });
              }}
            >
              {toggler.pwdToggler ? (
                <h1>- Change Password</h1>
              ) : (
                <h1>+ Change Password</h1>
              )}
            </div>
            <div className={ProfilePageStyle.changePwd__body}>
              {toggler.pwdToggler ? <ChangePassword /> : <></>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
