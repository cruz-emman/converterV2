const subjects = [
    'sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', 'sub10', 
    'sub11', 'sub12', 'sub13', 'sub14', 'sub15', 'sub16', 'sub17', 'sub18', 'sub19', 'sub20'
  ];
  
  const sections = [
    'sec1', 'sec2', 'sec3', 'sec4', 'sec5', 'sec6', 'sec7', 'sec8', 'sec9', 'sec10', 
    'sec11', 'sec12', 'sec13', 'sec14', 'sec15', 'sec16', 'sec17', 'sec18', 'sec19', 'sec20'
  ];

export const sampleColumn = [
    {field: 'username', header: "username", width: 250},
    ...subjects.flatMap((subject, index) => [
        {
            field: `course${index + 1}`,
            header: `Subject ${index + 1}`,
            renderCell: (params) => {
                let firstSubject = ""
                let section = params.row[subject] || "";
                if(params.row[sections[index]]){
                    let dashIndex = params.row[sections[index]].indexOf('-');
                    firstSubject = dashIndex  !== -1 ? params.row[sections[index]].substring(dashIndex + 1) : params[section[index]];
                }
                let combined = section.concat(" ", firstSubject)
                return (
                    <div>
                        {params.row[sections[index]] ? `${combined} ${sem}_${year}`: ""}
                    </div>
                )
            },
            valueGetter: (params) => {
                let firstSubject = ""
                let section = params.row[subject] || "";
                if(params.row[sections[index]]){
                    let dashIndex = params.row[sections[index]].indexOf('-');
                    firstSubject = dashIndex  !== -1 ? params.row[sections[index]].substring(dashIndex + 1) : params[section[index]];
                }
                let combined = section.concat(" ", firstSubject)
                if(section === params.row[subject]){
                    return `${combined} ${sem}_${year}`
                }else if (section === ""){
                    return ""
                }
            }
        },
        {
            field: `role${index + 1}`,
            header: `Role ${index + 1}`,
            width: 500,
            renderCell: (params) => <div>{params.row[subject] ? "student" : ""}</div>,
            valueGetter: (params) => params.row[subject] ? "student" : "",
        }

    ])
]