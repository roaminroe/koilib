import { DictionaryGenesisData, GenesisDataDecoded, GenesisDataEncoded } from "./interface";
/**
 * Function to encode genesis data in order to launch a
 * new blockchain. The different values are serialized using
 * protobuffers. One of the arguments is the dictionary which
 * contains the relevant information to perform the serialization.
 * By default the function contains the dictionary for the
 * following keys:
 *
 * - "object_key::head_block"
 * - "object_key::chain_id"
 * - "object_key::genesis_key"
 * - "object_key::resource_limit_data"
 * - "object_key::max_account_resources"
 * - "object_key::protocol_descriptor"
 * - "object_key::compute_bandwidth_registry"
 * - "object_key::block_hash_code"
 *
 * @param genesisDataDecoded - Genesis data where the values are
 * objects.
 * @param dictionary - Set of keys which contains the relevant
 * information to perform the serialization
 *
 * @example
 *
 * ```ts
 * const signer = Signer.fromSeed("seed");
 * const genesisDataDecoded = {
 *   entries: [
 *     {
 *       space: { system: true },
 *       alias: "object_key::genesis_key",
 *       value: signer.address,
 *     },
 *   ],
 * };
 *
 * const genesisData = await encodeGenesisData(genesisDataDecoded);
 * console.log(genesisData);
 *
 * // {
 * //   entries: [
 * //     {
 * //       space: { system: true },
 * //       key: "EiC3nO+XbeKg4C8ugW7M7XdfmJKY4i3l91KoJWxosQPImA==",
 * //       value: "AMpASH7CjUHBpl2QR8E5lGKVjVLAvJRg5g==",
 * //     },
 * //   ],
 * // }
 * ```
 *
 * @example adding a custom dictionary
 *
 * ```ts
 * const contractId = Signer.fromSeed("seed").address;
 * const zone = encodeBase64(decodeBase58(contractId));
 * const genesisDataDecoded = {
 *   entries: [
 *     {
 *       space: { system: true, zone, id: 1 },
 *       key: "difficulty_metadata_key",
 *       value: {
 *         target: encodeBase64url(toUint8Array("F".repeat(64))),
 *         last_block_time: "1641038400000",
 *         difficulty: encodeBase64url(toUint8Array("1".repeat(64))),
 *         target_block_interval: "10",
 *       },
 *     },
 *   ],
 * };
 *
 * const powJson = {
 *   nested: {
 *     mypackage: {
 *       nested: {
 *         difficulty_metadata: {
 *           "fields": {
 *             "target": { "type": "bytes", "id": 1 },
 *             "last_block_time": { "type": "uint64", "id": 2,
 *               "options": { "jstype": "JS_STRING" }
 *             },
 *             "difficulty": { "type": "bytes", "id": 3 },
 *             "target_block_interval": { "type": "uint64", "id": 4,
 *                "options": { "jstype": "JS_STRING" }
 *             }
 *           }
 *         },
 *       }
 *     }
 *   }
 * }
 *
 * const dic = {
 *   difficulty_metadata_key: {
 *     serializer: new Serializer(powJson),
 *     typeName: "difficulty_metadata",
 *   },
 * };
 *
 * const genesisData = await encodeGenesisData(genesisDataDecoded, dic);
 * console.log(genesisData);
 *
 * // {
 * //   entries: [
 * //     {
 * //       key: "difficulty_metadata_key",
 * //       space: {
 * //         id: 1,
 * //         system: true,
 * //         zone: "AMpASH7CjUHBpl2QR8E5lGKVjVLAvJRg5g==",
 * //       },
 * //       value:
 * //         "CiD//////////////////////////////////////////xCAlIus4S8aIBERERERERERERERERERERERERERERERERERERERERERIAo=",
 * //     },
 * //   ],
 * // };
 * ```
 */
export declare function encodeGenesisData(genesisDataDecoded: GenesisDataDecoded, dictionary?: DictionaryGenesisData): Promise<GenesisDataEncoded>;
/**
 * Function to decode genesis data used to launch a
 * new blockchain. The different values are deserialized using
 * protobuffers. One of the arguments is the dictionary which
 * contains the relevant information for the deserialization.
 * By default the function contains the dictionary for the
 * following keys:
 *
 * - "object_key::head_block"
 * - "object_key::chain_id"
 * - "object_key::genesis_key"
 * - "object_key::resource_limit_data"
 * - "object_key::max_account_resources"
 * - "object_key::protocol_descriptor"
 * - "object_key::compute_bandwidth_registry"
 * - "object_key::block_hash_code"
 *
 * @param genesisData - Genesis data
 * @param dictionary - Set of keys which contains the relevant
 * information to perform the deserialization
 *
 * @example
 *
 * ```ts
 * const genesisData = {
 *   entries: [
 *     {
 *       space: { system: true },
 *       key: "EiC3nO+XbeKg4C8ugW7M7XdfmJKY4i3l91KoJWxosQPImA==",
 *       value: "AMpASH7CjUHBpl2QR8E5lGKVjVLAvJRg5g==",
 *     },
 *   ],
 * }
 *
 * const genesisDataDecoded = await decodeGenesisData(genesisData);
 * console.log(genesisDataDecoded);
 *
 * // {
 * //   entries: [
 * //     {
 * //       space: { system: true },
 * //       key: "EiC3nO+XbeKg4C8ugW7M7XdfmJKY4i3l91KoJWxosQPImA==",
 * //       alias: "object_key::genesis_key",
 * //       value: "1KSQWDyUnFZ48Pf2hsW8Akh1b5fKUWc8Z3",
 * //     },
 * //   ],
 * // };
 * ```
 *
 * @example adding a custom dictionary
 *
 * ```ts
 * const genesisData = {
 *   entries: [
 *     {
 *       key: "difficulty_metadata_key",
 *       space: {
 *         id: 1,
 *         system: true,
 *         zone: "AMpASH7CjUHBpl2QR8E5lGKVjVLAvJRg5g==",
 *       },
 *       value:
 *         "CiD//////////////////////////////////////////xCAlIus4S8aIBERERERERERERERERERERERERERERERERERERERERERIAo=",
 *     },
 *   ],
 * };
 *
 * const powJson = {
 *   nested: {
 *     mypackage: {
 *       nested: {
 *         difficulty_metadata: {
 *           "fields": {
 *             "target": { "type": "bytes", "id": 1 },
 *             "last_block_time": { "type": "uint64", "id": 2,
 *               "options": { "jstype": "JS_STRING" }
 *             },
 *             "difficulty": { "type": "bytes", "id": 3 },
 *             "target_block_interval": { "type": "uint64", "id": 4,
 *                "options": { "jstype": "JS_STRING" }
 *             }
 *           }
 *         },
 *       }
 *     }
 *   }
 * }
 *
 * const dic = {
 *   difficulty_metadata_key: {
 *     serializer: new Serializer(powJson),
 *     typeName: "difficulty_metadata",
 *   },
 * };
 *
 * const genesisDataDecoded = await decodeGenesisData(genesisData, dic);
 * console.log(genesisData);
 *
 * // {
 * //   entries: [
 * //     {
 * //       space: { system: true, zone, id: 1 },
 * //       key: "difficulty_metadata_key",
 * //       value: {
 * //         target: "__________________________________________8=",
 * //         last_block_time: "1641038400000",
 * //         difficulty: "ERERERERERERERERERERERERERERERERERERERERERE=",
 * //         target_block_interval: "10",
 * //       },
 * //     },
 * //   ],
 * // };
 * ```
 */
export declare function decodeGenesisData(genesisData: GenesisDataEncoded, dictionary?: DictionaryGenesisData): Promise<GenesisDataDecoded>;
export declare const ChainTypes: {
    nested: {
        koinos: {
            options: {
                go_package: string;
            };
            nested: {
                block_topology: {
                    fields: {
                        id: {
                            type: string;
                            id: number;
                            options: {
                                "(btype)": string;
                            };
                        };
                        height: {
                            type: string;
                            id: number;
                            options: {
                                jstype: string;
                            };
                        };
                        previous: {
                            type: string;
                            id: number;
                            options: {
                                "(btype)": string;
                            };
                        };
                    };
                };
                protocol: {
                    options: {
                        go_package: string;
                    };
                    nested: {
                        event_data: {
                            fields: {
                                sequence: {
                                    type: string;
                                    id: number;
                                };
                                source: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                name: {
                                    type: string;
                                    id: number;
                                };
                                data: {
                                    type: string; /**
                                     * Function to encode genesis data in order to launch a
                                     * new blockchain. The different values are serialized using
                                     * protobuffers. One of the arguments is the dictionary which
                                     * contains the relevant information to perform the serialization.
                                     * By default the function contains the dictionary for the
                                     * following keys:
                                     *
                                     * - "object_key::head_block"
                                     * - "object_key::chain_id"
                                     * - "object_key::genesis_key"
                                     * - "object_key::resource_limit_data"
                                     * - "object_key::max_account_resources"
                                     * - "object_key::protocol_descriptor"
                                     * - "object_key::compute_bandwidth_registry"
                                     * - "object_key::block_hash_code"
                                     *
                                     * @param genesisDataDecoded - Genesis data where the values are
                                     * objects.
                                     * @param dictionary - Set of keys which contains the relevant
                                     * information to perform the serialization
                                     *
                                     * @example
                                     *
                                     * ```ts
                                     * const signer = Signer.fromSeed("seed");
                                     * const genesisDataDecoded = {
                                     *   entries: [
                                     *     {
                                     *       space: { system: true },
                                     *       alias: "object_key::genesis_key",
                                     *       value: signer.address,
                                     *     },
                                     *   ],
                                     * };
                                     *
                                     * const genesisData = await encodeGenesisData(genesisDataDecoded);
                                     * console.log(genesisData);
                                     *
                                     * // {
                                     * //   entries: [
                                     * //     {
                                     * //       space: { system: true },
                                     * //       key: "EiC3nO+XbeKg4C8ugW7M7XdfmJKY4i3l91KoJWxosQPImA==",
                                     * //       value: "AMpASH7CjUHBpl2QR8E5lGKVjVLAvJRg5g==",
                                     * //     },
                                     * //   ],
                                     * // }
                                     * ```
                                     *
                                     * @example adding a custom dictionary
                                     *
                                     * ```ts
                                     * const contractId = Signer.fromSeed("seed").address;
                                     * const zone = encodeBase64(decodeBase58(contractId));
                                     * const genesisDataDecoded = {
                                     *   entries: [
                                     *     {
                                     *       space: { system: true, zone, id: 1 },
                                     *       key: "difficulty_metadata_key",
                                     *       value: {
                                     *         target: encodeBase64url(toUint8Array("F".repeat(64))),
                                     *         last_block_time: "1641038400000",
                                     *         difficulty: encodeBase64url(toUint8Array("1".repeat(64))),
                                     *         target_block_interval: "10",
                                     *       },
                                     *     },
                                     *   ],
                                     * };
                                     *
                                     * const powJson = {
                                     *   nested: {
                                     *     mypackage: {
                                     *       nested: {
                                     *         difficulty_metadata: {
                                     *           "fields": {
                                     *             "target": { "type": "bytes", "id": 1 },
                                     *             "last_block_time": { "type": "uint64", "id": 2,
                                     *               "options": { "jstype": "JS_STRING" }
                                     *             },
                                     *             "difficulty": { "type": "bytes", "id": 3 },
                                     *             "target_block_interval": { "type": "uint64", "id": 4,
                                     *                "options": { "jstype": "JS_STRING" }
                                     *             }
                                     *           }
                                     *         },
                                     *       }
                                     *     }
                                     *   }
                                     * }
                                     *
                                     * const dic = {
                                     *   difficulty_metadata_key: {
                                     *     serializer: new Serializer(powJson),
                                     *     typeName: "difficulty_metadata",
                                     *   },
                                     * };
                                     *
                                     * const genesisData = await encodeGenesisData(genesisDataDecoded, dic);
                                     * console.log(genesisData);
                                     *
                                     * // {
                                     * //   entries: [
                                     * //     {
                                     * //       key: "difficulty_metadata_key",
                                     * //       space: {
                                     * //         id: 1,
                                     * //         system: true,
                                     * //         zone: "AMpASH7CjUHBpl2QR8E5lGKVjVLAvJRg5g==",
                                     * //       },
                                     * //       value:
                                     * //         "CiD//////////////////////////////////////////xCAlIus4S8aIBERERERERERERERERERERERERERERERERERERERERERIAo=",
                                     * //     },
                                     * //   ],
                                     * // };
                                     * ```
                                     */
                                    id: number;
                                };
                                impacted: {
                                    rule: string;
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                            };
                        };
                        contract_call_bundle: {
                            fields: {
                                contract_id: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                entry_point: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        system_call_target: {
                            oneofs: {
                                target: {
                                    oneof: string[];
                                };
                            };
                            fields: {
                                thunk_id: {
                                    type: string;
                                    id: number;
                                };
                                system_call_bundle: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        upload_contract_operation: {
                            fields: {
                                contract_id: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                bytecode: {
                                    type: string;
                                    id: number;
                                };
                                abi: {
                                    type: string;
                                    id: number;
                                };
                                authorizes_call_contract: {
                                    type: string;
                                    id: number;
                                };
                                authorizes_transaction_application: {
                                    type: string;
                                    id: number;
                                };
                                authorizes_upload_contract: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        call_contract_operation: {
                            fields: {
                                contract_id: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                entry_point: {
                                    type: string;
                                    id: number;
                                };
                                args: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        set_system_call_operation: {
                            fields: {
                                call_id: {
                                    type: string;
                                    id: number;
                                };
                                target: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        set_system_contract_operation: {
                            fields: {
                                contract_id: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                system_contract: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        operation: {
                            oneofs: {
                                op: {
                                    oneof: string[];
                                };
                            };
                            fields: {
                                upload_contract: {
                                    type: string;
                                    id: number;
                                };
                                call_contract: {
                                    type: string;
                                    id: number;
                                };
                                set_system_call: {
                                    type: string;
                                    id: number;
                                };
                                set_system_contract: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        transaction_header: {
                            fields: {
                                chain_id: {
                                    type: string;
                                    id: number;
                                };
                                rc_limit: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                nonce: {
                                    type: string;
                                    id: number;
                                };
                                operation_merkle_root: {
                                    type: string;
                                    id: number;
                                };
                                payer: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                payee: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                            };
                        };
                        transaction: {
                            fields: {
                                id: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                header: {
                                    type: string;
                                    id: number;
                                };
                                operations: {
                                    rule: string;
                                    type: string;
                                    id: number;
                                };
                                signatures: {
                                    rule: string;
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        transaction_receipt: {
                            fields: {
                                id: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                payer: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                max_payer_rc: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                rc_limit: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                rc_used: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                disk_storage_used: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                network_bandwidth_used: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                compute_bandwidth_used: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                reverted: {
                                    type: string;
                                    id: number;
                                };
                                events: {
                                    rule: string;
                                    type: string;
                                    id: number;
                                };
                                logs: {
                                    rule: string;
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        block_header: {
                            fields: {
                                previous: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                height: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                timestamp: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                previous_state_merkle_root: {
                                    type: string;
                                    id: number;
                                };
                                transaction_merkle_root: {
                                    type: string;
                                    id: number;
                                };
                                signer: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                approved_proposals: {
                                    rule: string;
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                            };
                        };
                        block: {
                            fields: {
                                id: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                header: {
                                    type: string;
                                    id: number;
                                };
                                transactions: {
                                    rule: string;
                                    type: string;
                                    id: number;
                                };
                                signature: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        block_receipt: {
                            fields: {
                                id: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                height: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                disk_storage_used: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                network_bandwidth_used: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                compute_bandwidth_used: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                state_merkle_root: {
                                    type: string;
                                    id: number;
                                };
                                events: {
                                    rule: string;
                                    type: string;
                                    id: number;
                                };
                                transaction_receipts: {
                                    rule: string;
                                    type: string;
                                    id: number;
                                };
                                logs: {
                                    rule: string;
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                    };
                };
                chain: {
                    options: {
                        go_package: string;
                    };
                    nested: {
                        error_data: {
                            fields: {
                                message: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        result: {
                            oneofs: {
                                value: {
                                    oneof: string[];
                                };
                            };
                            fields: {
                                object: {
                                    type: string;
                                    id: number;
                                };
                                error: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        object_space: {
                            fields: {
                                system: {
                                    type: string;
                                    id: number;
                                };
                                zone: {
                                    type: string;
                                    id: number;
                                };
                                id: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        database_key: {
                            fields: {
                                space: {
                                    type: string;
                                    id: number;
                                };
                                key: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        max_account_resources: {
                            fields: {
                                value: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                            };
                        };
                        privilege: {
                            values: {
                                kernel_mode: number;
                                user_mode: number;
                            };
                        };
                        head_info: {
                            fields: {
                                head_topology: {
                                    type: string;
                                    id: number;
                                };
                                head_block_time: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                last_irreversible_block: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                            };
                        };
                        caller_data: {
                            fields: {
                                caller: {
                                    type: string;
                                    id: number;
                                    options: {
                                        "(btype)": string;
                                    };
                                };
                                caller_privilege: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        argument_data: {
                            fields: {
                                entry_point: {
                                    type: string;
                                    id: number;
                                };
                                arguments: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        resource_limit_data: {
                            fields: {
                                disk_storage_limit: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                disk_storage_cost: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                network_bandwidth_limit: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                network_bandwidth_cost: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                compute_bandwidth_limit: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                                compute_bandwidth_cost: {
                                    type: string;
                                    id: number;
                                    options: {
                                        jstype: string;
                                    };
                                };
                            };
                        };
                        contract_metadata_object: {
                            fields: {
                                hash: {
                                    type: string;
                                    id: number;
                                };
                                system: {
                                    type: string;
                                    id: number;
                                };
                                authorizes_call_contract: {
                                    type: string;
                                    id: number;
                                };
                                authorizes_transaction_application: {
                                    type: string;
                                    id: number;
                                };
                                authorizes_upload_contract: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        compute_bandwidth_entry: {
                            fields: {
                                name: {
                                    type: string;
                                    id: number;
                                };
                                compute: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        compute_bandwidth_registry: {
                            fields: {
                                entries: {
                                    rule: string;
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        genesis_entry: {
                            fields: {
                                space: {
                                    type: string;
                                    id: number;
                                };
                                key: {
                                    type: string;
                                    id: number;
                                };
                                value: {
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        genesis_data: {
                            fields: {
                                entries: {
                                    rule: string;
                                    type: string;
                                    id: number;
                                };
                            };
                        };
                        dsa: {
                            values: {
                                ecdsa_secp256k1: number;
                            };
                        };
                    };
                };
            };
        };
    };
};
