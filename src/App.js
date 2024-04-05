import React, { Component } from 'react';
import jsonData from './data.json';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentSummaries: {}
    };
  }

  componentDidMount() {
    const departmentSummaries = {};

    // วนลูปผู้ใช้แต่ละคนใน JSON
    jsonData.users.forEach(user => {
      const department = user.company.department;
      const gender = user.gender;
      const age = user.age;
      const hairColor = user.hair.color;
      const addressKey = `${user.firstName}${user.lastName}`;
      const postalCode = user.address.postalCode;

      // ตรวจสอบว่าแผนกถูกสร้างหรือยัง
      if (!departmentSummaries[department]) {
        departmentSummaries[department] = {
          male: 0,
          female: 0,
          ageRange: `${age}-${age}`,
          hair: {},
          addressUser: {}
        };
      }

      // เพิ่มจำนวนของเพศและสีผม
      departmentSummaries[department][gender]++;
      departmentSummaries[department].hair[hairColor] = (departmentSummaries[department].hair[hairColor] || 0) + 1;

      // ตรวจสอบช่วงอายุ
      const currentAgeRange = departmentSummaries[department].ageRange.split('-').map(Number);
      departmentSummaries[department].ageRange = `${Math.min(currentAgeRange[0], age)}-${Math.max(currentAgeRange[1], age)}`;

      // เพิ่มที่อยู่ผู้ใช้
      departmentSummaries[department].addressUser[addressKey] = postalCode;
    });

    this.setState({ departmentSummaries });
  }

  render() {
    const { departmentSummaries } = this.state;

    return (
      <div>
        {Object.keys(departmentSummaries).map(department => (
          <div key={department}>
            <h3>{department}</h3>
            <p>male : {departmentSummaries[department].male}</p>
            <p>female : {departmentSummaries[department].female}</p>
            <p>ageRange : {departmentSummaries[department].ageRange}</p>
            <p>hair :</p>
            <ul>
              {Object.keys(departmentSummaries[department].hair).map(color => (
                <li key={color}>{color}: {departmentSummaries[department].hair[color]}</li>
              ))}
            </ul>
            <p>addressUser:</p>
            <ul>
              {Object.keys(departmentSummaries[department].addressUser).map(user => (
                <li key={user}>{user}: {departmentSummaries[department].addressUser[user]}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default Summary;
