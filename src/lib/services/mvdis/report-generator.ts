import {
	Document,
	Paragraph,
	Packer,
	TextRun,
	TableRow,
	TableCell,
	Table,
	Footer,
	PageNumber,
	Header
} from 'docx';
import { YUANTAI_FULL_NAME, YUANTAI_SHORT_NAME } from '$lib/constants';

const BATCH_PREFIX = '10';

const getROCYear = (date: Date) => (date.getFullYear() - 1911).toString();
const getMonth = (date: Date) => (date.getMonth() + 1).toString();
const getDay = (date: Date) => date.getDate().toString();
const toROCDate = (date: Date) =>
	`${getROCYear(date).padStart(3, '0')} 年 ${getMonth(date).padStart(2, '0')} 月 ${getDay(date).padStart(2, '0')} 日`;

export class ReportGenerator {
	async generateStartReport(data, batchInfo) {
		const maleNumber = [...data.filter(({ gender }) => gender === '男')].length;
		const femaleNumber = [...data.filter(({ gender }) => gender === '男')].length;

		const transformedBatchInfo = {
			...batchInfo,
			startDate: new Date(batchInfo.start_date),
			endDate: new Date(batchInfo.end_date)
		};

		console.log(transformedBatchInfo);

		const formatHeader1 = (text: string) => {
			return new Paragraph({
				children: [new TextRun({ text, bold: true, size: 28 })],
				alignment: 'center'
			});
		};

		const formatHeader2 = (text: string) => {
			return new Paragraph({
				children: [new TextRun({ text, size: 22, bold: true })],
				alignment: 'center'
			});
		};

		const formatContent = (text: string) => {
			return new Paragraph({
				children: [new TextRun({ text, size: 22 })],
				alignment: 'center'
			});
		};

		const generateRows = [
			...data.map(
				(record) =>
					new TableRow({
						height: {
							value: '8mm',
							rule: 'atLeast'
						},
						children: [
							new TableCell({
								children: [formatContent(record.no)],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatContent(record.name)],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatContent(record.gender)],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatContent(record.birth)],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatContent(record.national_id)],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [
									new Paragraph({
										children: [new TextRun({ text: record.address, size: 22 })]
									})
								],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatContent(record.transmission_type)],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatContent(record.mobile)],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatContent(record.license_exam_type)],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatContent(record.learning_license_date)],
								verticalAlign: 'center'
							})
						]
					})
			),
			new TableRow({
				height: {
					value: '8mm',
					rule: 'atLeast'
				},
				children: [
					new TableCell({
						children: [
							new Paragraph({
								children: [
									new TextRun({
										text: `合計     男：   ${maleNumber}		人	女：	${femaleNumber}		人	總計：		${maleNumber + femaleNumber}		人`,
										size: 22
									})
								],
								alignment: 'right'
							})
						],
						verticalAlign: 'center',
						columnSpan: 10
					})
				]
			})
		];

		const doc = new Document({
			sections: [
				{
					properties: {
						page: {
							size: {
								width: '210mm',
								height: '297mm',
								orientation: 'landscape'
							}
						}
					},
					children: [
						new Table({
							width: {
								size: 100,
								type: 'pct'
							},
							rows: [
								new TableRow({
									children: [
										new TableCell({
											children: [formatHeader1('所站：台中區監理所')],
											columnSpan: 3
										}),
										new TableCell({
											children: [formatHeader1('學員開訓名冊')],
											columnSpan: 4
										}),
										new TableCell({
											children: [
												formatHeader1(`開訓： ${toROCDate(transformedBatchInfo.startDate)}`)
											],
											columnSpan: 3
										})
									],
									tableHeader: true
								}),
								new TableRow({
									children: [
										new TableCell({
											children: [formatHeader1(`期別： ${BATCH_PREFIX + batchInfo.batch}`)],
											columnSpan: 3
										}),
										new TableCell({
											children: [formatHeader1(YUANTAI_FULL_NAME)],
											columnSpan: 4
										}),
										new TableCell({
											children: [
												formatHeader1(`結訓： ${toROCDate(transformedBatchInfo.endDate)}`)
											],
											columnSpan: 3
										})
									],

									tableHeader: true
								}),
								new TableRow({
									children: [
										new TableCell({
											children: [formatHeader2('學號')],
											width: {
												size: 5,
												type: 'pct'
											}
										}),
										new TableCell({
											children: [formatHeader2('姓名')],
											width: {
												size: 10,
												type: 'pct'
											}
										}),
										new TableCell({
											children: [formatHeader2('性別')],
											width: {
												size: 5,
												type: 'pct'
											}
										}),
										new TableCell({
											children: [formatHeader2('出生日期')]
										}),
										new TableCell({
											children: [formatHeader2('身分證字號')]
										}),
										new TableCell({
											children: [formatHeader2('住址')]
										}),
										new TableCell({
											children: [formatHeader2('手/自排')]
										}),
										new TableCell({
											children: [formatHeader2('電話')]
										}),
										new TableCell({
											children: [formatHeader2('資格照類')]
										}),
										new TableCell({
											children: [formatHeader2('發照日')]
										})
									],
									tableHeader: true
								}),
								...generateRows
							]
						})
					],
					footers: {
						default: new Footer({
							children: [
								new Paragraph({
									alignment: 'center',
									children: [
										new TextRun({
											children: [YUANTAI_SHORT_NAME]
										})
									]
								}),
								new Paragraph({
									alignment: 'right',
									children: [
										new TextRun({
											children: ['第 ', PageNumber.CURRENT, ' 頁、']
										}),
										new TextRun({
											children: ['共 ', PageNumber.TOTAL_PAGES, ' 頁']
										})
									]
								})
							]
						})
					}
				}
			]
		});

		return Packer.toBlob(doc);
	}

	async generateEndReport(data, batchInfo) {
		return this.generateStartReport(data, batchInfo);
	}

	// TODO: Implement this
	async generateTestReport(data, batchInfo) {
		const formatTableContent = (text: string) => {
			return new Paragraph({
				children: [new TextRun({ text, bold: true, size: '10pt' })],
				alignment: 'center'
			});
		};

		const generateRows = [
			...data.map(
				(record) =>
					new TableRow({
						height: {
							value: '8mm',
							rule: 'atLeast'
						},
						children: [
							new TableCell({
								children: [formatTableContent('期別-號碼')],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatTableContent('姓名')],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatTableContent('出生日期')],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatTableContent('路考組別')],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatTableContent('筆試')],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatTableContent('路試(場)')],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatTableContent('核發駕駛執照號碼')],
								verticalAlign: 'center'
							}),
							new TableCell({
								children: [formatTableContent('備註(補訓)')],
								verticalAlign: 'center'
							})
						]
					})
			)
		];

		const doc = new Document({
			sections: [
				{
					properties: {
						page: {
							size: {
								width: '210mm',
								height: '297mm',
								orientation: 'portrait'
							},
							margin: {
								top: '12.7mm',
								right: '12.7mm',
								bottom: '12.7mm',
								left: '12.7mm'
							}
						}
					},
					children: [
						new Table({
							width: {
								size: 100,
								type: 'pct'
							},
							rows: [
								new TableRow({
									height: {
										value: '8mm',
										rule: 'atLeast'
									},
									children: [
										new TableCell({
											children: [formatTableContent('期別-號碼')],
											verticalAlign: 'center'
										}),
										new TableCell({
											children: [formatTableContent('姓名')],
											verticalAlign: 'center'
										}),
										new TableCell({
											children: [formatTableContent('出生日期')],
											verticalAlign: 'center'
										}),
										new TableCell({
											children: [formatTableContent('路考組別')],
											verticalAlign: 'center'
										}),
										new TableCell({
											children: [formatTableContent('筆試')],
											verticalAlign: 'center'
										}),
										new TableCell({
											children: [formatTableContent('路試(場)')],
											verticalAlign: 'center'
										}),
										new TableCell({
											children: [formatTableContent('核發駕駛執照號碼')],
											verticalAlign: 'center'
										}),
										new TableCell({
											children: [formatTableContent('備註(補訓)')],
											verticalAlign: 'center'
										})
									]
								}),
								...generateRows
							]
						})
					],
					footers: {
						default: new Footer({
							children: [
								new Table({
									width: {
										size: 100,
										type: 'pct'
									},
									rows: [
										new TableRow({
											children: [
												new TableCell({
													children: [formatTableContent('報名')],
													columnSpan: 4
												}),
												new TableCell({
													children: [formatTableContent('筆試')],
													columnSpan: 6
												})
											]
										}),
										new TableRow({
											children: [
												new TableCell({
													children: [formatTableContent('筆試人數')]
												}),
												new TableCell({
													children: [formatTableContent('路考人數')]
												}),

												new TableCell({
													children: [formatTableContent('審核員')]
												}),
												new TableCell({
													children: [formatTableContent('')]
												}),
												new TableCell({
													children: [formatTableContent('應考人數')]
												}),
												new TableCell({
													children: [formatTableContent('及格人數')]
												}),
												new TableCell({
													children: [formatTableContent('不及格人數')]
												}),
												new TableCell({
													children: [formatTableContent('棄考人數')]
												}),
												new TableCell({
													children: [formatTableContent('主考')]
												}),
												new TableCell({
													children: [formatTableContent('監考')]
												})
											],
											tableHeader: true
										}),
										new TableRow({
											height: {
												value: '25mm',
												rule: 'atLeast'
											},

											children: [
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												})
											]
										}),
										new TableRow({
											children: [
												new TableCell({
													children: [formatTableContent('填（發）照')],
													columnSpan: 2
												}),
												new TableCell({
													children: [formatTableContent('檔案管理員')],
													rowSpan: 2
												}),
												new TableCell({
													children: [formatTableContent('考驗課長')],
													rowSpan: 2
												}),
												new TableCell({
													children: [formatTableContent('路考')],
													columnSpan: 6
												})
											]
										}),
										new TableRow({
											children: [
												new TableCell({
													children: [formatTableContent('填發張數')],
													width: {
														size: 5,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('填發員')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('應考人數')]
												}),
												new TableCell({
													children: [formatTableContent('及格人數')]
												}),
												new TableCell({
													children: [formatTableContent('不及格人數')]
												}),
												new TableCell({
													children: [formatTableContent('棄考人數')]
												}),
												new TableCell({
													children: [formatTableContent('主考')]
												}),
												new TableCell({
													children: [formatTableContent('監考')]
												})
											],
											tableHeader: true
										}),
										new TableRow({
											height: {
												value: '25mm',
												rule: 'atLeast'
											},

											children: [
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												}),
												new TableCell({
													children: [formatTableContent('')],
													width: {
														size: 10,
														type: 'pct'
													}
												})
											]
										})
									]
								})
							]
						})
					},
					headers: {
						default: new Header({
							children: [
								new Paragraph({
									alignment: 'center',
									children: [
										new TextRun({
											children: ['交通部公路局      台中區監理所      元泰駕訓班'],
											size: '18pt'
										})
									]
								}),
								new Paragraph({
									alignment: 'center',
									children: [
										new TextRun({
											children: [
												`普通小客車 第 ${BATCH_PREFIX + batchInfo.batch}期 汽車駕駛人考驗紀錄清冊`
											],
											size: '18pt'
										})
									]
								}),
								new Paragraph({
									alignment: 'left',
									children: [
										new TextRun({
											children: [
												`日期：${toROCDate(new Date())}                      	 頁次： `,
												PageNumber.CURRENT
											],
											size: '18pt'
										})
									]
								})
							]
						})
					}
				}
			]
		});

		return Packer.toBlob(doc);
	}
}

export const reportGenerator = new ReportGenerator();
