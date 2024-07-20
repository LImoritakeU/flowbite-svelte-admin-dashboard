export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			_prisma_migrations: {
				Row: {
					applied_steps_count: number;
					checksum: string;
					finished_at: string | null;
					id: string;
					logs: string | null;
					migration_name: string;
					rolled_back_at: string | null;
					started_at: string;
				};
				Insert: {
					applied_steps_count?: number;
					checksum: string;
					finished_at?: string | null;
					id: string;
					logs?: string | null;
					migration_name: string;
					rolled_back_at?: string | null;
					started_at?: string;
				};
				Update: {
					applied_steps_count?: number;
					checksum?: string;
					finished_at?: string | null;
					id?: string;
					logs?: string | null;
					migration_name?: string;
					rolled_back_at?: string | null;
					started_at?: string;
				};
				Relationships: [];
			};
			batches: {
				Row: {
					batch: string;
					class_type: string;
					end_date: string | null;
					inside_road_test_date: string | null;
					outside_road_test_date: string | null;
					start_date: string | null;
					written_test_date: string | null;
				};
				Insert: {
					batch: string;
					class_type: string;
					end_date?: string | null;
					inside_road_test_date?: string | null;
					outside_road_test_date?: string | null;
					start_date?: string | null;
					written_test_date?: string | null;
				};
				Update: {
					batch?: string;
					class_type?: string;
					end_date?: string | null;
					inside_road_test_date?: string | null;
					outside_road_test_date?: string | null;
					start_date?: string | null;
					written_test_date?: string | null;
				};
				Relationships: [];
			};
			employees: {
				Row: {
					address: string | null;
					birth: string | null;
					education: string | null;
					'emergency contact': string | null;
					gender: string | null;
					home_telephone: string | null;
					id: string;
					license_type: string | null;
					mobile: string | null;
					name: string;
					notes: string | null;
					onboard_date: string | null;
					register_address: string | null;
					resignation_date: string | null;
					title: string | null;
				};
				Insert: {
					address?: string | null;
					birth?: string | null;
					education?: string | null;
					'emergency contact'?: string | null;
					gender?: string | null;
					home_telephone?: string | null;
					id: string;
					license_type?: string | null;
					mobile?: string | null;
					name: string;
					notes?: string | null;
					onboard_date?: string | null;
					register_address?: string | null;
					resignation_date?: string | null;
					title?: string | null;
				};
				Update: {
					address?: string | null;
					birth?: string | null;
					education?: string | null;
					'emergency contact'?: string | null;
					gender?: string | null;
					home_telephone?: string | null;
					id?: string;
					license_type?: string | null;
					mobile?: string | null;
					name?: string;
					notes?: string | null;
					onboard_date?: string | null;
					register_address?: string | null;
					resignation_date?: string | null;
					title?: string | null;
				};
				Relationships: [];
			};
			licenses: {
				Row: {
					birth: string;
					car_license_type: string | null;
					education: string;
					expired_date: string | null;
					id: number;
					license_number: string | null;
					license_status: string | null;
					motor_license_type: string | null;
					name: string;
					national_id: string;
					since: string | null;
					training_lesson_type: string | null;
					type: string;
				};
				Insert: {
					birth: string;
					car_license_type?: string | null;
					education: string;
					expired_date?: string | null;
					id?: number;
					license_number?: string | null;
					license_status?: string | null;
					motor_license_type?: string | null;
					name: string;
					national_id: string;
					since?: string | null;
					training_lesson_type?: string | null;
					type: string;
				};
				Update: {
					birth?: string;
					car_license_type?: string | null;
					education?: string;
					expired_date?: string | null;
					id?: number;
					license_number?: string | null;
					license_status?: string | null;
					motor_license_type?: string | null;
					name?: string;
					national_id?: string;
					since?: string | null;
					training_lesson_type?: string | null;
					type?: string;
				};
				Relationships: [];
			};
			postal_codes: {
				Row: {
					codes: number;
					second_level: string | null;
					third_level: string | null;
				};
				Insert: {
					codes: number;
					second_level?: string | null;
					third_level?: string | null;
				};
				Update: {
					codes?: number;
					second_level?: string | null;
					third_level?: string | null;
				};
				Relationships: [];
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					full_name: string | null;
					id: string;
					updated_at: string | null;
					username: string | null;
					website: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					full_name?: string | null;
					id: string;
					updated_at?: string | null;
					username?: string | null;
					website?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					full_name?: string | null;
					id?: string;
					updated_at?: string | null;
					username?: string | null;
					website?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			road_tests: {
				Row: {
					batch: string;
					created_at: string;
					group: number;
					serial_number: number;
					student_id: string | null;
					times: number | null;
					type: string | null;
				};
				Insert: {
					batch: string;
					created_at?: string;
					group: number;
					serial_number: number;
					student_id?: string | null;
					times?: number | null;
					type?: string | null;
				};
				Update: {
					batch?: string;
					created_at?: string;
					group?: number;
					serial_number?: number;
					student_id?: string | null;
					times?: number | null;
					type?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'public_road_tests_groups_batch_fkey';
						columns: ['batch'];
						isOneToOne: false;
						referencedRelation: 'batches';
						referencedColumns: ['batch'];
					},
					{
						foreignKeyName: 'public_road_tests_groups_student_id_fkey';
						columns: ['student_id'];
						isOneToOne: false;
						referencedRelation: 'students';
						referencedColumns: ['id'];
					}
				];
			};
			students: {
				Row: {
					address: string | null;
					batch: string | null;
					birth: string | null;
					designated: boolean;
					email: string | null;
					gender: string | null;
					id: string;
					instructor: Database['public']['Enums']['instructor_code'] | null;
					learning_license_date: string | null;
					license_exam_type: Database['public']['Enums']['license_exam_type'] | null;
					mobile: string | null;
					name: string | null;
					national_id: string | null;
					no: number | null;
					notes: string | null;
					postal_code: number | null;
					register_instructor: string | null;
					second_phone_number: string | null;
					student_id: string | null;
					time_slot: string | null;
					transmission_type: Database['public']['Enums']['transmission_type'] | null;
				};
				Insert: {
					address?: string | null;
					batch?: string | null;
					birth?: string | null;
					designated?: boolean;
					email?: string | null;
					gender?: string | null;
					id?: string;
					instructor?: Database['public']['Enums']['instructor_code'] | null;
					learning_license_date?: string | null;
					license_exam_type?: Database['public']['Enums']['license_exam_type'] | null;
					mobile?: string | null;
					name?: string | null;
					national_id?: string | null;
					no?: number | null;
					notes?: string | null;
					postal_code?: number | null;
					register_instructor?: string | null;
					second_phone_number?: string | null;
					student_id?: string | null;
					time_slot?: string | null;
					transmission_type?: Database['public']['Enums']['transmission_type'] | null;
				};
				Update: {
					address?: string | null;
					batch?: string | null;
					birth?: string | null;
					designated?: boolean;
					email?: string | null;
					gender?: string | null;
					id?: string;
					instructor?: Database['public']['Enums']['instructor_code'] | null;
					learning_license_date?: string | null;
					license_exam_type?: Database['public']['Enums']['license_exam_type'] | null;
					mobile?: string | null;
					name?: string | null;
					national_id?: string | null;
					no?: number | null;
					notes?: string | null;
					postal_code?: number | null;
					register_instructor?: string | null;
					second_phone_number?: string | null;
					student_id?: string | null;
					time_slot?: string | null;
					transmission_type?: Database['public']['Enums']['transmission_type'] | null;
				};
				Relationships: [
					{
						foreignKeyName: 'students_postal_code_fkey';
						columns: ['postal_code'];
						isOneToOne: false;
						referencedRelation: 'postal_codes';
						referencedColumns: ['codes'];
					}
				];
			};
			time_slots: {
				Row: {
					end_time: string | null;
					slot: number;
					start_time: string | null;
				};
				Insert: {
					end_time?: string | null;
					slot: number;
					start_time?: string | null;
				};
				Update: {
					end_time?: string | null;
					slot?: number;
					start_time?: string | null;
				};
				Relationships: [];
			};
			users: {
				Row: {
					created_at: string;
					id: number;
					line_oauth_id: string | null;
					role: string | null;
					username: string | null;
				};
				Insert: {
					created_at?: string;
					id?: number;
					line_oauth_id?: string | null;
					role?: string | null;
					username?: string | null;
				};
				Update: {
					created_at?: string;
					id?: number;
					line_oauth_id?: string | null;
					role?: string | null;
					username?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			delete_avatar: {
				Args: {
					avatar_url: string;
				};
				Returns: Record<string, unknown>;
			};
			delete_storage_object: {
				Args: {
					bucket: string;
					object: string;
				};
				Returns: Record<string, unknown>;
			};
			delete_user: {
				Args: Record<PropertyKey, never>;
				Returns: undefined;
			};
			get_m3_end: {
				Args: {
					batch: string;
				};
				Returns: {
					national_id: string;
					birth: string;
					transmission_type: string;
					instructor_national_id: string;
					instructor_birth: string;
				}[];
			};
			get_m3_road_test: {
				Args: {
					batch: string;
				};
				Returns: {
					class_type_and_batch: string;
					national_id: string;
					birth: string;
					_group: number;
					road_test_date: string;
					serial_number: number;
					type: string;
				}[];
			};
			get_m3_start: {
				Args: {
					batch: string;
				};
				Returns: {
					national_id: string;
					birth: string;
					name: string;
					mobile: string;
					no: number;
					license_exam_type: string;
					transmission_type: string;
					instructor_national_id: string;
					instructor_birth: string;
				}[];
			};
			get_m3_written_test: {
				Args: {
					batch: string;
				};
				Returns: {
					class_type_and_batch: string;
					national_id: string;
					birth: string;
					_group: number;
					written_test_date: string;
					serial_number: number;
				}[];
			};
			print_report_start: {
				Args: {
					batch: string;
				};
				Returns: {
					no: string;
					name: string;
					gender: string;
					birth: string;
					national_id: string;
					address: string;
					transmission_type: string;
					mobile: string;
					license_exam_type: string;
					learning_license_date: string;
				}[];
			};
		};
		Enums: {
			instructor_code: 'A' | 'Z' | 'L' | 'P' | 'M' | 'J' | 'W' | 'T';
			license_exam_type:
				| '新考'
				| '晉級'
				| '考換'
				| '吊扣註銷'
				| '吊銷重考'
				| '臨時駕駛執照'
				| 'A'
				| 'B'
				| 'C'
				| 'G'
				| 'Z';
			transmission_type: '手排' | '自排' | 'M' | 'A';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
		? PublicSchema['Enums'][PublicEnumNameOrOptions]
		: never;
