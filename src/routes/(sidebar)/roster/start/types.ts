export const studentColumnsMapping = {
	columns: {
		// ID should be in the first column since gridJS relies on it
		id: {
			label: 'ID',
			name: 'id',
			hidden: true
		},
		student_id: {
			label: '學號',
			name: 'student_id'
		},
		batch: {
			label: '期別',
			name: 'batch'
		},
		no: {
			label: '編號',
			name: 'no'
		},
		name: {
			label: '姓名',
			name: 'name'
		},
		mobile: {
			label: '行動電話',
			name: 'mobile'
		},
		email: {
			label: '電子郵件',
			name: 'email'
		},
		time_slot: {
			label: '練車時段',
			name: 'time_slot'
		},
		designated: {
			label: '指定教練',
			name: 'designated'
		},

		instructor: {
			label: '教練代號',
			name: 'instructor'
		},
		national_id: {
			label: '身分證字號',
			name: 'national_id'
		},

		birth: {
			label: '生日',
			name: 'birth'
		},
		notes: {
			label: '備註',
			name: 'notes'
		},
		gender: {
			label: '性別',
			name: 'gender'
		},

		postal_code: {
			label: '郵遞區號',
			name: 'postal_code'
		},
		address: {
			label: '地址',
			name: 'address'
		},
		second_phone_number: {
			label: '緊急連絡電話',
			name: 'second_phone_number'
		},
		transmission_type: {
			label: '手排/自排',
			name: 'transmission_type'
		},
		license_exam_type: {
			label: '考別',
			name: 'license_exam_type'
		},
		register_instructor: {
			label: '冊報教練',
			name: 'register_instructor'
		},
		learning_license_date: {
			label: '學照日期',
			name: 'learning_license_date'
		}
	}
};
