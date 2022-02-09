const testEmployee = ["Gray", "Worm", "Security", 1]
const twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
]
const dataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300],
    ["Byron", "Poodle", "Mascot", 3],
    ["Julius", "Caesar", "General", 27],
    ["Rafiki", "", "Aide", 10],
    ["Simba", "", "King", 100]
]

const createEmployeeRecord = (array) => {
    const employeeCard = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
    return employeeCard
}

const testEmployeeObj = createEmployeeRecord(testEmployee)

const createEmployeeRecords = (arrays) => {
    return arrays.map(array => createEmployeeRecord(array))
}

const twoRowsObj = createEmployeeRecords(twoRows)

const createTimeInEvent = (empObj, dateStamp) => {
    const [date, hour] = dateStamp.split(' ')
    const timeIn = {
        type: 'TimeIn',
        hour: Number.parseInt(hour),
        date: date
    }
    empObj.timeInEvents.push(timeIn)
    return empObj
}


const createTimeOutEvent = (empObj, dateStamp) => {
    const [date, hour] = dateStamp.split(' ')
    const timeOut = {
        type: 'TimeOut',
        hour: Number.parseInt(hour),
        date: date
    }
    empObj.timeOutEvents.push(timeOut)
    return empObj
}
createTimeInEvent(testEmployeeObj, '2022-01-02 1600')
createTimeOutEvent(testEmployeeObj, '2022-01-02 2000')

createTimeInEvent(twoRowsObj[0], '2022-01-03 800')
createTimeOutEvent(twoRowsObj[0], '2022-01-03 1400')

createTimeInEvent(twoRowsObj[1], '2022-01-05 800')
createTimeOutEvent(twoRowsObj[1], '2022-01-05 1500')

const hoursWorkedOnDate = (empObj, targetDate) => {
    const timeIn = empObj.timeInEvents.find(timeIn => timeIn.date === targetDate)
    const timeOut = empObj.timeOutEvents.find(timeOut => timeOut.date === targetDate)
    return (timeOut.hour - timeIn.hour) / 100
}

hoursWorkedOnDate(testEmployeeObj, '2022-01-02')

const wagesEarnedOnDate = (empObj, targetDate) => {
    const payRate = empObj.payPerHour
    return (hoursWorkedOnDate(empObj, targetDate)) * payRate
}

const allWagesFor = (empObj) => {
    const timeIn = empObj.timeInEvents
    const availableDates = timeIn.map((timeIn) => timeIn.date)
    const payPerDate = availableDates.map(date => (wagesEarnedOnDate(empObj, date)))
    return payPerDate.reduce((value1, value2) => value1 + value2)
}
allWagesFor(testEmployeeObj)

const calculatePayroll = (arrOfEmployee) => {
    const arrayofwages = arrOfEmployee.map(empObj => allWagesFor(empObj))
    return arrayofwages.reduce((value1, value2) => value1 + value2)
}

calculatePayroll(twoRowsObj)