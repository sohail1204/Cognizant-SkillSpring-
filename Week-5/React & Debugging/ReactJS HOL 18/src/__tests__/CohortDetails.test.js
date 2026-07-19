import React from 'react';
import { shallow, mount } from 'enzyme';
import CohortDetails from '../components/CohortDetails';
import { CohortData } from '../components/Cohort';

describe('Cohort Details Component', () => {
  const mockCohort = CohortData[0];

  // Test Case 1: should create the component
  test('should create the component', () => {
    const wrapper = shallow(<CohortDetails cohort={mockCohort} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test Case 2: should initialize the props
  test('should initialize the props', () => {
    const wrapper = mount(<CohortDetails cohort={mockCohort} />);
    expect(wrapper.props().cohort).toEqual(mockCohort);
    expect(wrapper.props().cohort.code).toBe('C01');
  });

  // Test Case 3: should display cohort code in h3
  test('should display cohort code in h3', () => {
    const wrapper = mount(<CohortDetails cohort={mockCohort} />);
    const h3Element = wrapper.find('h3');
    expect(h3Element.exists()).toBe(true);
    expect(h3Element.text()).toBe(mockCohort.code);
  });

  // Test Case 4: should always render same html
  test('should always render same html', () => {
    const wrapper = shallow(<CohortDetails cohort={mockCohort} />);
    expect(wrapper).toMatchSnapshot();
  });
});
