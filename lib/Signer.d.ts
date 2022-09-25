import { Provider } from "./Provider";
import { TransactionJson, TransactionJsonWait, BlockJson, RecoverPublicKeyOptions, Abi, TransactionReceipt, SendTransactionOptions } from "./interface";
export interface SignerInterface {
    provider?: Provider;
    getAddress: (compressed?: boolean) => string;
    getPrivateKey: (format: "wif" | "hex", compressed?: boolean) => string;
    signHash: (hash: Uint8Array) => Promise<Uint8Array>;
    signMessage: (message: string | Uint8Array) => Promise<Uint8Array>;
    prepareTransaction: (tx: TransactionJson) => Promise<TransactionJson>;
    signTransaction: (transaction: TransactionJson | TransactionJsonWait, abis?: Record<string, Abi>) => Promise<TransactionJson>;
    sendTransaction: (transaction: TransactionJson | TransactionJsonWait, options?: SendTransactionOptions) => Promise<{
        receipt: TransactionReceipt;
        transaction: TransactionJsonWait;
    }>;
    prepareBlock: (block: BlockJson) => Promise<BlockJson>;
    signBlock: (block: BlockJson) => Promise<BlockJson>;
}
/**
 * The Signer Class contains the private key needed to sign transactions.
 * It can be created using the seed, wif, or private key
 *
 * @example
 * using private key as hex string
 * ```ts
 * var privateKey = "ec8601a24f81decd57f4b611b5ac6eb801cb3780bb02c0f9cdfe9d09daaddf9c";
 * var signer = new Signer({ privateKey });
 * ```
 * <br>
 *
 * using private key as Uint8Array
 * ```ts
 * var buffer = new Uint8Array([
 *   236, 134,   1, 162,  79, 129, 222, 205,
 *    87, 244, 182,  17, 181, 172, 110, 184,
 *     1, 203,  55, 128, 187,   2, 192, 249,
 *   205, 254, 157,   9, 218, 173, 223, 156
 * ]);
 * var signer = new Signer({ privateKey: buffer });
 * ```
 *
 * <br>
 *
 * using private key as bigint
 * ```ts
 * var privateKey = 106982601049961974618234078204952280507266494766432547312316920283818886029212n;
 * var signer = new Signer({ privateKey });
 * ```
 *
 * <br>
 *
 * using the seed
 * ```ts
 * var signer = Signer.fromSeed("my seed");
 * ```
 *
 * <br>
 *
 * using private key in WIF format
 * ```ts
 * var signer = Signer.fromWif("L59UtJcTdNBnrH2QSBA5beSUhRufRu3g6tScDTite6Msuj7U93tM");
 * ```
 *
 * <br>
 *
 * defining a provider
 * ```ts
 * var provider = new Provider(["https://example.com/jsonrpc"]);
 * var privateKey = "ec8601a24f81decd57f4b611b5ac6eb801cb3780bb02c0f9cdfe9d09daaddf9c";
 * var signer = new Signer({ privateKey, provider });
 * ```
 */
export declare class Signer implements SignerInterface {
    /**
     * Boolean determining if the public/private key
     * is using the compressed format
     */
    compressed: boolean;
    private privateKey;
    publicKey: string | Uint8Array;
    /**
     * Account address
     */
    address: string;
    /**
     * Chain id
     */
    chainId: string;
    /**
     * Provider to connect with the blockchain
     */
    provider?: Provider;
    /**
     * Options to apply when sending a transaction.
     * By default broadcast is true and the other fields
     * are undefined
     */
    sendOptions?: SendTransactionOptions;
    /**
     * The constructor receives de private key as hexstring, bigint or Uint8Array.
     * See also the functions [[Signer.fromWif]] and [[Signer.fromSeed]]
     * to create the signer from the WIF or Seed respectively.
     *
     * @param privateKey - Private key as hexstring, bigint or Uint8Array
     * @param compressed - compressed format is true by default
     * @param provider - provider to connect with the blockchain
     * @example
     * ```ts
     * const privateKey = "ec8601a24f81decd57f4b611b5ac6eb801cb3780bb02c0f9cdfe9d09daaddf9c";
     * cons signer = new Signer({ privateKey });
     * console.log(signer.getAddress());
     * // 1MbL6mG8ASAvSYdoMnGUfG3ZXkmQ2dpL5b
     * ```
     */
    constructor(c: {
        privateKey: string | number | bigint | Uint8Array;
        compressed?: boolean;
        chainId?: string;
        provider?: Provider;
        sendOptions?: SendTransactionOptions;
    });
    /**
     * Function to import a private key from the WIF
     * @param wif  - Private key in WIF format
     * @example
     * ```ts
     * const signer = Signer.fromWif("L59UtJcTdNBnrH2QSBA5beSUhRufRu3g6tScDTite6Msuj7U93tM")
     * console.log(signer.getAddress());
     * // 1MbL6mG8ASAvSYdoMnGUfG3ZXkmQ2dpL5b
     * ```
     * @returns Signer object
     */
    static fromWif(wif: string, compressed?: boolean): Signer;
    /**
     * Function to import a private key from the seed
     * @param seed - Seed words
     * @param compressed -
     * @example
     * ```ts
     * const signer = Signer.fromSeed("my seed");
     * console.log(signer.getAddress());
     * // 1BqtgWBcqm9cSZ97avLGZGJdgso7wx6pCA
     * ```
     * @returns Signer object
     */
    static fromSeed(seed: string, compressed?: boolean): Signer;
    /**
     * @param compressed - determines if the address should be
     * derived from the compressed public key (default) or the public key
     * @returns Signer address
     */
    getAddress(compressed?: boolean): string;
    /**
     * Function to get the private key in hex format or wif format
     * @param format - The format must be "hex" (default) or "wif"
     * @param compressed - Optional arg when using WIF format. By default it
     * uses the compressed value defined in the signer
     * @example
     * ```ts
     * const signer = Signer.fromSeed("one two three four five six");
     * console.log(signer.getPrivateKey());
     * // bab7fd6e5bd624f4ea0c33f7e7219262a6fa93a945a8964d9f110148286b7b37
     *
     * console.log(signer.getPrivateKey("wif"));
     * // L3UfgFJWmbVziGB1uZBjkG1UjKkF7hhpXWY7mbTUdmycmvXCVtiL
     *
     * console.log(signer.getPrivateKey("wif", false));
     * // 5KEX4TMHG66fT7cM9HMZLmdp4hVq4LC4X2Fkg6zeypM5UteWmtd
     * ```
     */
    getPrivateKey(format?: "wif" | "hex", compressed?: boolean): string;
    /**
     * Function to sign a hash value. It returns the bytes signature.
     * The signature is in compact format with the recovery byte
     * @param hash - Hash value. Also known as digest
     */
    signHash(hash: Uint8Array): Promise<Uint8Array>;
    /**
     * Function to sign a message, which could be a string or a Uint8Array
     */
    signMessage(message: string | Uint8Array): Promise<Uint8Array>;
    /**
     * Function to sign a transaction. It's important to remark that
     * the transaction parameter is modified inside this function.
     * @param tx - Unsigned transaction
     */
    signTransaction(tx: TransactionJson | TransactionJsonWait, _abis?: Record<string, Abi>): Promise<TransactionJson>;
    /**
     * Function to sign a block for federated consensus. That is,
     * just the ecdsa signature. For other algorithms, like PoW,
     * you have to sign the block and then process the signature
     * to add the extra data (nonce in the case of PoW).
     * @param block - Unsigned block
     */
    signBlock(block: BlockJson): Promise<BlockJson>;
    /**
     * Function to sign and send a transaction. It internally uses
     * [[Provider.sendTransaction]]
     * @param transaction - Transaction to send. It will be signed inside this
     * function if it is not signed yet
     * @param options - Options for sending the transaction
     */
    sendTransaction(transaction: TransactionJson | TransactionJsonWait, options?: SendTransactionOptions): Promise<{
        receipt: TransactionReceipt;
        transaction: TransactionJsonWait;
    }>;
    /**
     * Function to recover the public key from hash and signature
     * @param hash - hash sha256
     * @param signature - compact signature
     * @param compressed - default true
     */
    static recoverPublicKey(hash: Uint8Array, signature: Uint8Array, compressed?: boolean): string;
    static recoverAddress(hash: Uint8Array, signature: Uint8Array, compressed?: boolean): string;
    /**
     * Function to recover the publics keys from a signed
     * transaction or block.
     * The output format can be compressed (default) or uncompressed.
     *
     * @example
     * ```ts
     * const publicKeys = await Signer.recoverPublicKeys(tx);
     * ```
     *
     * If the signature data contains more data, like in the
     * blocks for PoW consensus, use the "transformSignature"
     * function to extract the signature.
     *
     * @example
     * ```ts
     *  const powDescriptorJson = {
     *    nested: {
     *      mypackage: {
     *        nested: {
     *          pow_signature_data: {
     *            fields: {
     *              nonce: {
     *                type: "bytes",
     *                id: 1,
     *              },
     *              recoverable_signature: {
     *                type: "bytes",
     *                id: 2,
     *              },
     *            },
     *          },
     *        },
     *      },
     *    },
     *  };
     *
     *  const serializer = new Serializer(powDescriptorJson, {
     *   defaultTypeName: "pow_signature_data",
     *  });
     *
     *  const publicKeys = await signer.recoverPublicKeys(block, {
     *    transformSignature: async (signatureData) => {
     *      const powSignatureData = await serializer.deserialize(signatureData);
     *      return powSignatureData.recoverable_signature;
     *    },
     *  });
     * ```
     */
    recoverPublicKeys(txOrBlock: TransactionJson | BlockJson, opts?: RecoverPublicKeyOptions): Promise<string[]>;
    /**
     * Function to recover the signer addresses from a signed
     * transaction or block.
     * The output format can be compressed (default) or uncompressed.
     * @example
     * ```ts
     * const addresses = await signer.recoverAddress(tx);
     * ```
     *
     * If the signature data contains more data, like in the
     * blocks for PoW consensus, use the "transformSignature"
     * function to extract the signature.
     *
     * @example
     * ```ts
     *  const powDescriptorJson = {
     *    nested: {
     *      mypackage: {
     *        nested: {
     *          pow_signature_data: {
     *            fields: {
     *              nonce: {
     *                type: "bytes",
     *                id: 1,
     *              },
     *              recoverable_signature: {
     *                type: "bytes",
     *                id: 2,
     *              },
     *            },
     *          },
     *        },
     *      },
     *    },
     *  };
     *
     *  const serializer = new Serializer(powDescriptorJson, {
     *   defaultTypeName: "pow_signature_data",
     *  });
     *
     *  const addresses = await signer.recoverAddress(block, {
     *    transformSignature: async (signatureData) => {
     *      const powSignatureData = await serializer.deserialize(signatureData);
     *      return powSignatureData.recoverable_signature;
     *    },
     *  });
     * ```
     */
    recoverAddresses(txOrBlock: TransactionJson | BlockJson, opts?: RecoverPublicKeyOptions): Promise<string[]>;
    /**
     * Function to prepare a transaction
     * @param tx - Do not set the nonce to get it from the blockchain
     * using the provider. The rc_limit is 1e8 by default.
     * @returns A prepared transaction. ()
     */
    prepareTransaction(tx: TransactionJson): Promise<TransactionJson>;
    /**
     * Function to prepare a block
     * @param block -
     * @returns A prepared block. ()
     */
    prepareBlock(block: BlockJson): Promise<BlockJson>;
}
export default Signer;
